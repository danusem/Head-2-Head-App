// Input Process Out

//INPUT

//PROCESS

/**************************Event Listeners***************************/
// What do I want my user to interact with?


$('form').on('submit', (event)=> {
    event.preventDefault();
    const userInput = $('input[type = "text"]').val();
    console.log(userInput);
    const promise = $.ajax({
        url: 'https://www.balldontlie.io/api/v1/players/' + userInput

    });


//OUTPUT
// This is where we transfer the state of the APP to the DOM

    promise.then(
        (data)=>{
            $('#first-name').html(data.first_name);
            $('#last-name').html(data.last_name);
            $('#team').html(data.team.full_name);
            $('#position').html(data.position);
        
        
},
    (error)=>{
        console.log('Error:', error);

    }
    );

});