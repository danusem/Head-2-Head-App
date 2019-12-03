// Input Process Out

//INPUT

let input1, input2;

const $player1ResultElement = $('#player1-results');
const $player2ResultElement = $('#player2-results');

//PROCESS

/**************************Event Listeners***************************/
// What do I want my user to interact with?


$('form').on('submit', (event)=> {
    event.preventDefault();

    const input1 = $('#player1').val();
    const input2 = $('#player2').val();

    
     const requests = $.when(
        $.ajax('https://www.balldontlie.io/api/v1/players?search=' + input1),
        $.ajax('https://www.balldontlie.io/api/v1/players?search=' + input2)
    );
    requests.then(function(res1, res2) {
        player1Results = res1[0].data[0]
        player2Results = res2[0].data[0]
        render()
    });        
});

function generateUI(obj) {
    return `
        <dl>
            <dt>First Name</dt>
            <dd id="first-name">${obj.first_name}</dd>
            <dt>Last Name</dt>
            <dd id="last-name">${obj.last_name}</dd>
            <dt>Team</dt>
            <dd id="city">${obj.team.full_name}</dd>
            <dt>Conference</dt>
            <dd id="conference">${obj.team.conference}</dd>
            <dt>Position</dt>
            <dd id="position">${obj.position}</dd>
            <dt>Height Feet</dt>
            <dd id="height-feet">${obj.height_feet}</dd>
            <dt>Height Inches</dt>
            <dd id="height-inches">${obj.height_inches}</dd>
            <dt>Weight</dt>
            <dd id="weight-pounds">${obj.weight_pounds}</dd>
    
            
        </dl>
    `;
}
        
function render() {
    $player1ResultElement.html(generateUI(player1Results))
    $player2ResultElement.html(generateUI(player2Results))

}