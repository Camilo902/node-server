import readline from "readline";
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const tareas = [];

  function buscarTarea(){
    console.log(chalk.yellow("Lista de Tareas: "));

    tareas.forEach((tareas, index) => {
        const status = tareas.completed ? chalk.green("Tarea Completada") : chalk.red("Tarea Pendiente");
        console.log("${index + 1}. [${status}] ${tareas.description");

    });
  }

  function agregarTarea(description){
    tareas.push({ description, completed: false});
    console.log(chalk.green("Tarea agregada. "));
  }

  function removerTarea(index) {
if (index >= 0 && index < tareas.length){
    tareas.splice(index, 1);
    console.log(chalk.red("Tarea eliminada"));
}
  }

    function completarTarea(index){
    if (index >= 0 && index < tareas.length){
        tareas[index].completed = true;
        console.log(chalk.green("Tarea Completada"));
    } else {
        console.log(chalk.red("Accion no valida. La tarea no se eliminó"));
    }
  }

  function processCommand(input) {
    const [command, ...args] = input.split(" ");

    if(command === "agregar"){
        agregarTarea(args.join(" "));
    }else if (command === "eliminar"){
        removerTarea(parseInt(args[0]) - 1);
    }else if (command === "completar") {
        completarTarea(parseInt(args[0] - 1));
    } else if(command === "lista"){
        buscarTarea();
    }else if (command === "salir") {
        rl.close();
    }else{
        console.log(chalk.red("Accion no valida"));
    }
    }

    rl.setPrompt("Tarea> ");
    rl.prompt();
    
    rl.on("line", (input) => {
        processCommand(input);
        rl.prompt();
    });

    rl.on("Cerrar", () => {
        console.log(chalk.yellow("Hasta Luego"));
        process.exit(0);
    });
