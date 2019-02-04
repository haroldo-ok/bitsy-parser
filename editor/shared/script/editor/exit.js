/*
TODO:
- place exits & entrances
- consider the UI for that? "placement button"? or select the picture??
- also consider that you may be moving an exit into a totally different room
X connect to room tool
X remove exit
- should I have direct exit value manipulation (room + coords) as dropdowns?


available exits:
- two way exits
- exits that start in the current room
- exits that END in the current room
- ** whatever the CURRENT exit was when you switched rooms (this is kind of weird??)
	- this might exist "outside the list" such that if you de-select it won't return to the list
- principle: ANY exit that is VISIBLE in the current room should be part of the list
*/


function ExitTool(exitCanvas1, exitCanvas2) {
	var selectedRoom = null;

	var exitInfoList = [];
	var curExitInfo = null;

	exitCanvas1.width = width * scale; // TODO : globals?
	exitCanvas1.height = width * scale;
	var exitCtx1 = exitCanvas1.getContext("2d");

	exitCanvas2.width = width * scale; // TODO : globals?
	exitCanvas2.height = width * scale;
	var exitCtx2 = exitCanvas2.getContext("2d");

	console.log("EXIT TOOOL!!");
	console.log(exitCtx1);

	var PlacementMode = { // TODO : awkward name
		None : 0,
		Exit : 1,
		Destination : 2 // TODO : will I have to rename this?
	};
	var placementMode = PlacementMode.None;

	UpdatePlacementButtons();

	this.AddExit = function() {
		console.log(room);
		var newExit = {
			x : 0,
			y : 0,
			dest : { // start with valid destination so you can't accidentally uncreate exits
				room : "0",
				x : 15,
				y : 15
			}
		}
		room[selectedRoom].exits.push( newExit );

		exitInfoList = GatherExitInfoList();
		curExitInfo = exitInfoList.find(function(e) { return e.exit == newExit; });

		RenderExits();
	};

	this.SetRoom = function(roomId) {
		selectedRoom = roomId;
		ResetExitList();
	}

	this.Refresh = function() { // TODO: rename "Reset"???
		curExitInfo = null;
		ResetExitList();
	}

	function ResetExitList() {
		exitInfoList = GatherExitInfoList();
		if (curExitInfo == null && exitInfoList.length > 0) {
			curExitInfo = exitInfoList[0];
		}

		RenderExits();
	}

	function RenderExits() {
		if (curExitInfo != null) {
			drawRoom( room[curExitInfo.parentRoom], exitCtx1 );
			drawRoom( room[curExitInfo.exit.dest.room], exitCtx2 );
		}
		else {
			exitCtx1.clearRect(0, 0, exitCanvas1.width, exitCanvas1.height);
			exitCtx2.clearRect(0, 0, exitCanvas2.width, exitCanvas2.height);
		}
	}

	this.RemoveExit = function() {
		var i = room[curExitInfo.parentRoom].exits.indexOf(curExitInfo.exit);
		room[curExitInfo.parentRoom].exits.splice(i,1);

		exitInfoList = GatherExitInfoList();
		curExitInfo = exitInfoList.length > 0 ? exitInfoList[0] : null;

		RenderExits();
	}

	this.IsPlacingExit = function () {
		return placementMode != PlacementMode.None;
	}

	// this.StartPlacingExit = function() {
	// 	console.log("START PLACING EXIT");
	// 	placementMode = PlacementMode.Exit;
	// }

	// this.StartPlacingDestination = function() {
	// 	console.log("START PLACING Destination");
	// 	placementMode = PlacementMode.Destination;
	// }

	this.TogglePlacingExit = function(isPlacing) {
		if (isPlacing) {
			placementMode = PlacementMode.Exit;
		}
		else {
			placementMode = PlacementMode.None;
		}
		UpdatePlacementButtons();
	}

	this.TogglePlacingDestination = function(isPlacing) {
		if (isPlacing) {
			placementMode = PlacementMode.Destination;
		}
		else {
			placementMode = PlacementMode.None;
		}
		UpdatePlacementButtons();
	}

	function UpdatePlacementButtons() {
		// hackily relies on global UI names oh well D:
		if (placementMode == PlacementMode.Exit) {
			document.getElementById("toggleMoveExitDoor1").checked = true;
			document.getElementById("textMoveExitDoor1").innerText = "moving"; // TODO localize
			document.getElementById("cancelMoveExitDoor1").style.display = "inline";
		}
		else {
			document.getElementById("toggleMoveExitDoor1").checked = false;
			document.getElementById("textMoveExitDoor1").innerText = "move door"; // TODO localize
			document.getElementById("cancelMoveExitDoor1").style.display = "none";
		}

		if (placementMode == PlacementMode.Destination) {
			document.getElementById("toggleMoveExitDoor2").checked = true;
			document.getElementById("textMoveExitDoor2").innerText = "moving"; // TODO localize
			document.getElementById("cancelMoveExitDoor2").style.display = "inline";
		}
		else {
			document.getElementById("toggleMoveExitDoor2").checked = false;
			document.getElementById("textMoveExitDoor2").innerText = "move door"; // TODO localize
			document.getElementById("cancelMoveExitDoor2").style.display = "none";
		}
	}

	this.PlaceExit = function(x,y) {
		if (placementMode == PlacementMode.Exit) {
			if (curExitInfo != null) {
				curExitInfo.exit.x = x;
				curExitInfo.exit.y = y;

				console.log(curExitInfo);

				refreshGameData();
				RenderExits();
			}
		}
		else if (placementMode == PlacementMode.Destination) {
			if (curExitInfo != null) {
				curExitInfo.exit.dest.room = selectedRoom;
				curExitInfo.exit.dest.x = x;
				curExitInfo.exit.dest.y = y;

				refreshGameData();
				RenderExits();
			}
		}

		placementMode = PlacementMode.None;
		UpdatePlacementButtons();
	}

	this.PrevExit = function() {
		if (exitInfoList.length > 0) {
			if (curExitInfo != null) {
				var index = exitInfoList.indexOf(curExitInfo);
				if (index != -1) {
					index--;
					if (index < 0) {
						index = exitInfoList.length - 1;
					}

					curExitInfo = exitInfoList[index];
				}
				else {
					curExitInfo = exitInfoList[0];
				}
			}
			else {
				curExitInfo = exitInfoList[0];
			}
		}
		else {
			curExitInfo = null;
		}
		RenderExits();
	}

	this.NextExit = function() {
		if (exitInfoList.length > 0) {
			if (curExitInfo != null) {
				var index = exitInfoList.indexOf(curExitInfo);
				if (index != -1) {
					index++;
					if (index >= exitInfoList.length) {
						index = 0;
					}

					curExitInfo = exitInfoList[index];
				}
				else {
					curExitInfo = exitInfoList[0];
				}
			}
			else {
				curExitInfo = exitInfoList[0];
			}
		}
		else {
			curExitInfo = null;
		}
		RenderExits();
	}

	function GatherExitInfoList()
	{
		var infoList = [];

		for (var i in room[selectedRoom].exits) {
			infoList.push({
				parentRoom: selectedRoom,
				exit: room[selectedRoom].exits[i]
			});
		}

		for (var r in room) {
			if (r != selectedRoom) {
				for (var i in room[r].exits) {
					var exit = room[r].exits[i];
					if (exit.dest.room === selectedRoom) {
						infoList.push({
							parentRoom: r,
							exit: exit
						});
					}
				}
			}
		}

		return infoList;
	}
} // ExitTool