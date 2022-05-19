import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

import swal from 'sweetalert';
import Swal from 'sweetalert2';
function PageConsulterDemandeStage() {
   
  const Swal = require('sweetalert2');

  //rechercher
  const[searchTerm,setSearchTerm] = useState("");
  const[loading,setLoading] = useState(true);



  //Demande de stage
/*   const[demandelist,setDemandelist] = useState([]);

  useEffect(()=> {
     axios.get('api/afficher-demandes-stages').then(res=> {
        if(res.status ===200){
          setDemandelist(res.data.demandeStage) 
        }
        setLoading(false);
      }); 
  },[]); */
  
     
  //Stagiaire
  const[userlist,setUserlist] = useState([]);

  useEffect(()=> {
    axios.get('api/afficher-stagiaire').then(res=> {
      if(res.status ===200){
        setUserlist(res.data.stagiaire)
      }
      setLoading(false);
    });
},[]);
 

//accepter demande de stage


const accepter = (e , id) => {
  e.preventDefault();

  axios.put(`api/accepter-demande/${id}`).then(res=>{
    if(res.data.status === 200){

      Swal.fire("Succès","Email Acceptation du stagiaire envoyé avec succès" ,"success")//res.data.message
      window.location.href="/service-de-formation/afficher-demandes-stages" 
    }
      else if(res.data.status === 404){
        Swal.fire("Erreur","Email Acceptation stagiaire non envoyé réessayer!"  ,"error");//res.data.message
    } 
});
/* 

  Swal.fire({
    title: 'Accepter Demande de Stage ?',
 
    html: `
   
    <input type="email" id="email" class="swal2-input" placeholder="Email">`, 
    inputAttributes: {
      autocapitalize: 'off'
    }, 
    showCancelButton: true,
    confirmButtonText: 'Accepter',
    cancelButtonText: 'Annuler',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const email = Swal.getPopup().querySelector('#email').value 
      const data = {
           
           email:email,
       
        }
 


      axios.put(`api/accepter-demande/${id}`,data).then(res=>{
        if(res.data.status === 200){
 
          Swal.fire("Succès","Email Acceptation du stagiaire envoyé avec succès" ,"success")//res.data.message
          
        }
          else if(res.data.status === 500){
            Swal.fire("Erreur","Email Acceptation stagiaire non envoyé réessayer!"  ,"error");//res.data.message
        } 
   });
   
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
  
    }
  })
 */
}






//refuser demande de stage
const refuser = (e , id ) => {

  //const thisClicked = e.currentTarget;
  e.preventDefault();




  axios.put(`api/refuser-demande/${id}`).then(res=>{
    if(res.data.status === 200){
      //thisClicked.closest("tr").remove();
      Swal.fire("Succès","Email Refus du stagiaire envoyé avec succès" ,"success")//res.data.message
      window.location.href="/service-de-formation/afficher-demandes-stages" 
      
    }
      else if(res.data.status === 404){
        Swal.fire("Erreur","Email Refus stagiaire non envoyé réessayer!"  ,"error");//res.data.message
    } 
});



     
}







if(loading){
  return <div class="d-flex justify-content-center "
  style={{marginTop: '.150' ,  position: 'absolute',
  height: '100px',
  width: '100px',
  top:' 50%',
  left: '50%',
 }}>
  <div class="spinner-grow spinner-grow-sm " role="status"> </div>
  <div class="spinner-grow spinner-grow-sm " role="status"> </div>
  <div class="spinner-grow spinner-grow-sm " role="status"> </div>
 </div>
}



/* else{
 var afficher_Demande_Cards ="";
  afficher_Demande_Cards =
  demandelist.filter(val =>{
    if(searchTerm === ""){
      return val;
    }else if( val.typestage.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  }).map( (item , index) => { */



   else{
 var afficher_Demande_Cards ="";
  afficher_Demande_Cards =
  userlist.filter(val =>{
    if(val.DemandeStage){

  
    if(searchTerm === ""){
     
      return val;
    }
    
    
    else if(  val.demandeStages.typestage.toLowerCase().includes(searchTerm.toLowerCase()) || val.demandeStages.nom_dept.toLowerCase().includes(searchTerm.toLowerCase())  ) {
      return val;
    }
      }//////
  }).map( (dm , index) => { 

  

      



if(dm.DemandeStage !==null  && dm.etatSt =='etudiant'){




 return(
         <>







         {/* Card 1 <i className="fas fa-book mr-1" />*/}
<tr className="col-md-offset-3 col-md-3" > 
<div className="card card-primary  bg-light">
  <div className="card-header">
    <h3 className="card-title">Demande{index+1}</h3>
  </div>
  <div className="card-body"    >
    <strong>Nom et Prénom:</strong>
      <p>{dm.name} {dm.prenom} </p>

      <strong>Email:</strong>
      <p>{dm.email} </p>


 
    <strong>Type de stage</strong>  <br/>
      <p>{dm.DemandeStage.typestage}</p>


      <strong>Nom Département</strong>  <br/>
     
      <p>{dm.DemandeStage.nom_dept}</p>




   {/* -------------------------------------------------------------------------
   
   


    -----------------------------------------------------------------------------  */}
 


{/* Afficher détails   */}
<div>
  {/* Button trigger modal */}
  
  <div className="text-right py-0 align-middle">
<div class="btn-group btn-group-sm ">
                        <a href="#" class="btn btn-info" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></a>
                        {/* <a href="#" class="btn btn-danger" ><i class="fas fa-trash"></i></a> */}
                       {/* <Link to="#" class="btn btn-danger" ><i class="fas fa-ban"></i></Link>  */}
                   {/* <Link to="#" class="btn btn-success" > <i class="fas fa-chevron-circle-down"></i></Link>   onClick={(e) => valideDemande(e , dm._id  )}  */}  
                   <button type="button" className="btn btn-success" onClick={(e) => accepter(e , dm._id  ) }><i className="fas fa-chevron-circle-down"></i></button>
                   <button type="button" className="btn btn-danger " onClick={(e) => refuser(e , dm._id )} ><i className="fas fa-ban"></i></button>
                       

                        
</div></div>

  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Demande</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

  <div className="col-md-offset-3 col-md-12">
       <strong> Nom </strong> {dm.name} <br/>
       <strong>Prénom</strong>  {dm.prenom} <br/>
       <strong>Date de naissance</strong>  {dm.datenaissance} <br/>
       <strong> Email</strong>{dm.email} <br/> 
       <strong>Cin ou Passport </strong> {dm.cinoupassport_stagiaire} <br/>
       <strong>Niveau étude</strong> {dm.niveauetude} <br/>
       <strong>Spécialite</strong>{dm.specialite} <br/>
       <strong>Filiére</strong> {dm.filiere} <br/>
       <strong>Adresse</strong>{dm.adresse} <br/>
       <strong>Télephone</strong>{dm. telephone} <br/>
       
      {/*  <strong>Type de stage:</strong> {dm.demandeStages[0][0]}<br/>
       <strong>Nom département:</strong>  {dm.demandeStages[0][1]}<br/>
       <strong>CV</strong> {dm.demandeStages[0][2]} */}
{/* 
       <form>
               {/* utilisateur matricule 
            <strong >Matricule Encadrant </strong> 
          <div className="wrap-input100   col-lg-6 mb-4" >
        <input className="input100" type="number" placeholder="Matricule" name="Matricule" />
          <span className="focus-input111" />
          <span className="symbol-input111">
            
          </span>
          </div>
       </form> */}
  </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
          {/* <button type="button" className="btn btn-primary">Save changes</button> */}
        </div>
      </div>
    </div>
  </div>
</div>

{/* .Afficher détails   */}
</div>
</div>
</tr>
{/* .Card 1 */}
         
         






         </>
     )

    }







  //demande accepté
  

  if(dm.DemandeStage !==null &&  dm.etatSt== 'stagiaire_accepte_p' ){




    return(
            <>
   
   
   
   
   
   
   
            {/* Card 1 <i className="fas fa-book mr-1" />*/}
   <tr className="col-md-offset-3 col-md-3" > 
   <div className="card card-success  bg-light">
     <div className="card-header">
       <h3 className="card-title">Demande{index+1}</h3>
       <i className="fas fa-chevron-circle-down float-right"></i>
     </div>
     <div className="card-body"    >
       <strong>Nom et Prénom:</strong>
         <p>{dm.name} {dm.prenom} </p>
   
         <strong>Email:</strong>
         <p>{dm.email} </p>
   
   
    
       <strong>Type de stage</strong>  <br/>
         <p>{dm.DemandeStage.typestage}</p>
   
   
         <strong>Nom Département</strong>  <br/>
        
         <p>{dm.DemandeStage.nom_dept}</p>
   
   
   
   
      {/* -------------------------------------------------------------------------
      
      
   
   
       -----------------------------------------------------------------------------  */}
    
   
   
   {/* Afficher détails   */}
   <div>
     {/* Button trigger modal */}
     
     <div className="text-right py-0 align-middle">
   <div class="btn-group btn-group-sm ">
                           <a href="#" class="btn btn-success" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></a>
                           {/* <a href="#" class="btn btn-danger" ><i class="fas fa-trash"></i></a> */}
                          {/* <Link to="#" class="btn btn-danger" ><i class="fas fa-ban"></i></Link>  */}
                      {/* <Link to="#" class="btn btn-success" > <i class="fas fa-chevron-circle-down"></i></Link>   onClick={(e) => valideDemande(e , dm._id  )}  */}  
                      {/* <button type="button" className="btn btn-success" ><i className="fas fa-chevron-circle-down"></i></button>
                      <button type="button" className="btn btn-danger " onClick={(e) => refuser(e , dm._id )} ><i className="fas fa-ban"></i></button>
                          
    */}
                           
   </div></div>
   
     {/* Modal */}
     <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title" id="exampleModalLabel">Demande</h5>
             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">×</span>
             </button>
           </div>
           <div className="modal-body">
   
     <div className="col-md-offset-3 col-md-12">
          <strong> Nom </strong> {dm.name} <br/>
          <strong>Prénom</strong>  {dm.prenom} <br/>
          <strong>Date de naissance</strong>  {dm.datenaissance} <br/>
          <strong> Email</strong>{dm.email} <br/> 
          <strong>Cin ou Passport </strong> {dm.cinoupassport_stagiaire} <br/>
          <strong>Niveau étude</strong> {dm.niveauetude} <br/>
          <strong>Spécialite</strong>{dm.specialite} <br/>
          <strong>Filiére</strong> {dm.filiere} <br/>
          <strong>Adresse</strong>{dm.adresse} <br/>
          <strong>Télephone</strong>{dm. telephone} <br/>
          
         {/*  <strong>Type de stage:</strong> {dm.demandeStages[0][0]}<br/>
          <strong>Nom département:</strong>  {dm.demandeStages[0][1]}<br/>
          <strong>CV</strong> {dm.demandeStages[0][2]} */}
   {/* 
          <form>
                  {/* utilisateur matricule 
               <strong >Matricule Encadrant </strong> 
             <div className="wrap-input100   col-lg-6 mb-4" >
           <input className="input100" type="number" placeholder="Matricule" name="Matricule" />
             <span className="focus-input111" />
             <span className="symbol-input111">
               
             </span>
             </div>
          </form> */}
     </div>
           </div>
           <div className="modal-footer">
             <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
             {/* <button type="button" className="btn btn-primary">Save changes</button> */}
           </div>
         </div>
       </div>
     </div>
   </div>
   
   {/* .Afficher détails   */}
   </div>
   </div>
   </tr>
   {/* .Card 1 */}
            
            
   
   
   
   
   
   
            </>
        )
   
       }
   

  //.demande acceptée


  
  
    

  //demande refuser 
  if(dm.DemandeStage !==null &&  dm.etatSt== 'stagiaire_accepte_p_non' ){




    return(
            <>
   
   
   
   
   
   
   
            {/* Card 1 <i className="fas fa-book mr-1" />*/}
   <tr className="col-md-offset-3 col-md-3" > 
   <div className="card card-danger  bg-light">
     <div className="card-header">
       <h3 className="card-title">Demande{index+1}</h3>
       <i className="fas fa-ban float-right"></i>
     </div>
     <div className="card-body"    >
       <strong>Nom et Prénom:</strong>
         <p>{dm.name} {dm.prenom} </p>
   
         <strong>Email:</strong>
         <p>{dm.email} </p>
   
   
    
       <strong>Type de stage</strong>  <br/>
         <p>{dm.DemandeStage.typestage}</p>
   
   
         <strong>Nom Département</strong>  <br/>
        
         <p>{dm.DemandeStage.nom_dept}</p>
   
   
   
   
      {/* -------------------------------------------------------------------------
      
      
   
   
       -----------------------------------------------------------------------------  */}
    
   
   
   {/* Afficher détails   */}
   <div>
     {/* Button trigger modal */}
     
     <div className="text-right py-0 align-middle">
   <div class="btn-group btn-group-sm ">
                           <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></a>
                           {/* <a href="#" class="btn btn-danger" ><i class="fas fa-trash"></i></a> */}
                          {/* <Link to="#" class="btn btn-danger" ><i class="fas fa-ban"></i></Link>  */}
                      {/* <Link to="#" class="btn btn-success" > <i class="fas fa-chevron-circle-down"></i></Link>   onClick={(e) => valideDemande(e , dm._id  )}  */}  
                      {/* <button type="button" className="btn btn-success" ><i className="fas fa-chevron-circle-down"></i></button>
                      <button type="button" className="btn btn-danger " onClick={(e) => refuser(e , dm._id )} ><i className="fas fa-ban"></i></button>
                          
    */}
                           
   </div></div>
   
     {/* Modal */}
     <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div className="modal-dialog">
         <div className="modal-content">
           <div className="modal-header">
             <h5 className="modal-title" id="exampleModalLabel">Demande</h5>
             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">×</span>
             </button>
           </div>
           <div className="modal-body">
   
     <div className="col-md-offset-3 col-md-12">
          <strong> Nom </strong> {dm.name} <br/>
          <strong>Prénom</strong>  {dm.prenom} <br/>
          <strong>Date de naissance</strong>  {dm.datenaissance} <br/>
          <strong> Email</strong>{dm.email} <br/> 
          <strong>Cin ou Passport </strong> {dm.cinoupassport_stagiaire} <br/>
          <strong>Niveau étude</strong> {dm.niveauetude} <br/>
          <strong>Spécialite</strong>{dm.specialite} <br/>
          <strong>Filiére</strong> {dm.filiere} <br/>
          <strong>Adresse</strong>{dm.adresse} <br/>
          <strong>Télephone</strong>{dm. telephone} <br/>
          
         {/*  <strong>Type de stage:</strong> {dm.demandeStages[0][0]}<br/>
          <strong>Nom département:</strong>  {dm.demandeStages[0][1]}<br/>
          <strong>CV</strong> {dm.demandeStages[0][2]} */}
   {/* 
          <form>
                  {/* utilisateur matricule 
               <strong >Matricule Encadrant </strong> 
             <div className="wrap-input100   col-lg-6 mb-4" >
           <input className="input100" type="number" placeholder="Matricule" name="Matricule" />
             <span className="focus-input111" />
             <span className="symbol-input111">
               
             </span>
             </div>
          </form> */}
     </div>
           </div>
           <div className="modal-footer">
             <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
             {/* <button type="button" className="btn btn-primary">Save changes</button> */}
           </div>
         </div>
       </div>
     </div>
   </div>
   
   {/* .Afficher détails   */}
   </div>
   </div>
   </tr>
   {/* .Card 1 */}
            
            
   
   
   
   
   
   
            </>
        )
   
       }
   


  //.demande refuser
    
  });
 
}




return (
  <>
         <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">

          <div className="col-sm-6">
            <h3>Demandes Stages</h3>
    

          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/afficher-demandes-stages'>Demandes Stages</NavLink>


            
            
            </ol>
          </div>


        </div>
      </div>
    </section> 





    <div className="container ">
   <div className="card mt-4">
     <div className="card-header">







    <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
            <div class="input-group">
              <input type="search" placeholder="Que cherchez-vous?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
               onChange={(e)=> {
                  setSearchTerm(e.target.value);
               }}
              
              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>

          
      
    <div className="row container"> 
    {afficher_Demande_Cards}

    </div>
<br/><br/><br/><br/><br/><br/><br/>


</div>
</div>
    </div>











  
  </>
)

}
export default PageConsulterDemandeStage
