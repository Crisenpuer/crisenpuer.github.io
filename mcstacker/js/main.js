const commandPref = `
<div class="command">
    <div class="command-text">
        <input type="text" class="command-text">
    </div>
    <div class="command-trash">
        <button class="command-trash icon-minus"></button>
    </div>
</div>
`;
const commandBox = document.getElementById("commandbox");
const commandOut = document.getElementById("command-output")

function plusClick() {
    commandBox.insertAdjacentHTML("beforeend", commandPref);
}

function minusClick() {
    const commandElements = commandBox.getElementsByClassName("command");
    const commandCount = commandElements.length;

    if (commandCount > 1) {
        commandBox.removeChild(commandElements[commandCount -1]);
    }
}

const commandFirst = `summon minecraft:falling_block ~ ~1 ~ {BlockState:{Name:"redstone_block"},Passengers:[{id:"falling_block",BlockState:{Name:"activator_rail"}},`;
const commandMinecartB = `{id:"command_block_minecart",Tags:["stacker_minecart"],Command:'`;
const commandMinecartE = `'},`;
const commandLast = `{id:"command_block_minecart",Tags:["stacker_minecart"],Command:'setblock ~ ~-2 ~ repeating_command_block{Command:\\'execute unless entity @e[tag=stacker_minecart] run fill ~ ~ ~ ~ ~2 ~1 air\\'}'},{id:"command_block_minecart",Tags:["stacker_minecart"],Command:'setblock ~ ~-2 ~1 redstone_block'},{id:"command_block_minecart",Tags:["stacker_minecart"],Command:'kill @e[type=command_block_minecart,tag=stacker_minecart]'}]}`

function calcClick() {
    const commandElements = commandBox.querySelectorAll(".command");
    let outCommand = commandFirst;

    commandElements.forEach(command => {
        const input = command.querySelector("input.command-text");
        if (!input) {
            return;
        }

        let javaCommand = input.value
            .replace(/\\/g, "\\\\")
            .replace(/"/g, '\\"')  
            .replace(/'/g, "\\'"); 

        outCommand += commandMinecartB + javaCommand + commandMinecartE;
    });

    outCommand += commandLast;

    commandOut.value = outCommand;
}