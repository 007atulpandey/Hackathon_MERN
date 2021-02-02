import React from 'react'



const Video =()=>{
    

    const [data , allData] = useState([]) 

    useEffect(()=>{

        let flag = true ;
        var temp = [];
        
        fetch ( '/videos')
        .then( data => data.json())
        .then( data => data.result ) 
        .then( data => allData(data));

        
        
        return () => flag = false ;
    } ,[]);

    
    function remove (e  ) {
       
        fetch ( '/video/'+e.target.value , {
            method: 'DELETE', // Method itself
            headers: {
             'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
        })
        .then ( data =>data.json ())
        .then ( data => console.log( data)) ;



    };



    return (
      
<table class="table table-dark">
  <thead className="bg-danger">
    <tr className="bg-danger">
      <th scope="col">Upcoming Contest</th>
    </tr>
  </thead>
  <thead>
    <tr>
      <th scope="col">Thumbnail</th>
      <th scope="col">Song Name </th>
      <th scope="col">Artist Name</th>
      <th scope="col">Youtube Link</th>
      <th scope="col"> Delete </th>
    </tr>
  </thead>
  <tbody>
    
    {
        data.map((user)=>{
            return (
                <>
                <tr>
                  <th scope="row">{user.title }</th>
                  <td>{ user.artist }</td>
                  <td>{ user.imageUrl}</td>
                  <td>{ user.youtubeLink }</td>
                  <td>  < button className = "red " value = { user._id}  onClick = { remove }>  remove  </ button >  </td>
                </tr>

                </>
            )
        })
    }
  </tbody>
</table>
    )


} 

export default Video 