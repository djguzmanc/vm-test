function promisifyAjax(ajaxConfig) {
  return new Promise((resolve, reject) => {
    $.ajax({
      ...ajaxConfig,
      success: function (response) {
        resolve(response);
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}

var PlayerService = {
  getPlayerTeamId: function (playerId) {
    promisifyAjax({
      url: "/player/" + playerId + "/team",
    });
  },
  getPlayers: function (teamId) {
    promisifyAjax({
      url: "/team/" + teamId + "/player",
    });
  }
};

var PlayerDetailsController = {
  playerId: 8,
  showTeammatesClick: async function () {

    let teamId;
    try {
      teamId = await PlayerService.getPlayerTeamId(this.playerId);
    } catch (error) {
      // Handle team id error
    }

    let playerList;
    try {
      playerList = await PlayerService.getPlayers(teamId);

      // Render playerList
    } catch (error) {
      // Handle player list error
    }
  }
};
