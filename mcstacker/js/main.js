const COMMAND_DIV_PREF = `
<div class="command">
    <div class="command-text">
        <input type="text" class="command-text" value="" placeholder="Enter command here" id="command-input"/>
    </div>
</div>
`;
const commandBox = document.getElementById("commandbox");
const commandOut = document.getElementById("command-output")

function plusClick() {
    commandBox.insertAdjacentHTML("beforeend", COMMAND_DIV_PREF);
}

function minusClick() {
    const commandElements = commandBox.getElementsByClassName("command");
    const commandCount = commandElements.length;

    if (commandCount > 1) {
        commandBox.removeChild(commandElements[commandCount -1]);
    }
}

const COMMAND_FIRST = `summon minecraft:falling_block ~ ~1 ~ {BlockState:{Name:"redstone_block"},Passengers:[{id:"falling_block",BlockState:{Name:"activator_rail"}},`;
const COMMAND_MINECART_START = `{id:"command_block_minecart",Tags:["stacker_minecart"],Command:'`;
const COMMAND_MINECART_END = `'},`;
const COMMAND_LAST = `{id:"command_block_minecart",Tags:["stacker_minecart"],Command:'setblock ~ ~-2 ~ repeating_command_block{Command:\\'execute unless entity @e[tag=stacker_minecart] run fill ~ ~ ~ ~ ~2 ~1 air\\'}'},{id:"command_block_minecart",Tags:["stacker_minecart"],Command:'setblock ~ ~-2 ~1 redstone_block'},{id:"command_block_minecart",Tags:["stacker_minecart"],Command:'kill @e[type=command_block_minecart,tag=stacker_minecart]'}]}`

function calcClick() {
    const commandElements = commandBox.querySelectorAll(".command");
    let outCommand = COMMAND_FIRST;

    commandElements.forEach(command => {
        const input = command.querySelector("input.command-text");
        if (!input) {
            return;
        }

        let javaCommand = input.value
            .replace(/\\/g, "\\\\")
            .replace(/"/g, '\\"')  
            .replace(/'/g, "\\'"); 

        outCommand += COMMAND_MINECART_START + javaCommand + COMMAND_MINECART_END;
    });

    outCommand += COMMAND_LAST;

    commandOut.value = outCommand;
}