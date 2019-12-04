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

    
     const players = $.when(
        $.ajax('https://www.balldontlie.io/api/v1/players?search=' + input1),
        $.ajax('https://www.balldontlie.io/api/v1/players?search=' + input2)
    );
    players.then(function(res1, res2) {

        const player1BaseInfo = res1[0].data[0]
        const player2BaseInfo = res2[0].data[0]

        const playerId1 = player1BaseInfo.id
        const playerId2 = player2BaseInfo.id

        const averages = $.when(
            $.ajax("https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=" + playerId1 + "&player_ids[]=" + playerId2)
        );

        averages.then(function(resAverages) {
            const player1stats = resAverages.data[0];
            const player2stats = resAverages.data[1];

            const results1 = Object.assign(player1BaseInfo, player1stats);
            const results2 = Object.assign(player2BaseInfo, player2stats);

            render(results1, results2); 
        })
    });        
});

function generateUI(obj) {
    return `
        <dl>
            
            <dt>Season</dt>
            <dd id="season">${obj.season}</dd>
            <dt>Games Played</dt>
            <dd id="games-played">${obj.games_played}</dd>
            <dt>Team</dt>
            <dd id="city">${obj.team.full_name}</dd>
            <dt>Conference</dt>
            <dd id="conference">${obj.team.conference}</dd>
            <dt>Position</dt>
            <dd id="position">${obj.position}</dd>
            <dt>Points</dt>
            <dd id="points">${obj.pts}</dd>
            <dt>Assists</dt>
            <dd id="assists">${obj.ast}</dd>
            <dt>Rebounds</dt>
            <dd id="rebounds">${obj.reb}</dd>
            <dt>Steals</dt>
            <dd id="steal">${obj.stl}</dd>
            <dt>Blocks</dt>
            <dd id="blocks">${obj.blk}</dd>
            <dt>Field Goals Made</dt>
            <dd id="field-goals-made">${obj.fgm}</dd>
            <dt>Field Goals %</dt>
            <dd id="field-goals-percentage">${obj.fg_pct}</dd>
            
    
        </dl>
    `;
}
        
function render(result1, result2) {
    $player1ResultElement.html(generateUI(result1))
    $player2ResultElement.html(generateUI(result2))

}