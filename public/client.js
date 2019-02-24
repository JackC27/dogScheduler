let form = new FormData(document.querySelector('#selectTimesContainer'));

form.addEventListener("submit", (data) => {
  data.preventDefault();

  console.log("data ", data);
  
  fetch('/create_schedule', {
    method: 'post',
    body: data, // post body

    headers: {
      'Accept': 'application/json'
    }

  })
})