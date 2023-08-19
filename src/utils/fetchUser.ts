const fetchUser = async () => {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      
        await fetch("http://localhost:3000/api/friends", options)
        .then(res => res.json())
        .then(data => data.user)
}

export default fetchUser
