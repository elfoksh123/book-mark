var taskInput = document.getElementById("newTask");
var normalInput = document.getElementById("normalTask");
var taskContainer = [];
if(localStorage.getItem("userTask")!=null){
    taskContainer=JSON.parse(localStorage.getItem("userTask"))
    displayTask()
}

function addTask() {
    var taskInfo = {
        name: taskInput.value,
        site: normalInput.value,
    };

    if (taskInfo.name && taskInfo.site) {
        taskContainer.push(taskInfo); 
        localStorage.setItem("userTask",JSON.stringify(taskContainer))
        console.log(taskContainer); 
        displayTask();
        taskInput.value = '';  
        normalInput.value = '';  
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
}

function displayTask() {
    var taskBox = ``; 
    if(taskContainer.length==0){
        document.getElementById("allTasks").innerHTML=` <tr>
                                        <td colspan="4" class="fw-bold">Task List is Empty!</td>
                                    </tr>`
    } else{
        for (var i = 0; i < taskContainer.length; i++) {
            taskBox += `
            <tr class="fw-normal">
                <td>${i + 1}</td>
                <td>
                    <span>${taskContainer[i].name} - ${taskContainer[i].site}</span>
                </td>
                <td>
                    <a href="${taskContainer[i].site}" target="_blank" class="update">
                        <i class="fas fa-external-link-alt fa-lg text-success me-3"></i>Visit
                    </a>
                </td>
                <td>
                    <a style="cursor: pointer;" class="delete" onclick="deleteTask(${i})">
                        <i class="fas fa-trash-alt fa-lg text-danger"></i>
                    </a>
                </td>
               
            </tr>`;
        }
        document.getElementById("allTasks").innerHTML = taskBox; 

    }
  
}

function deleteTask(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          taskContainer.splice(index, 1); 
          localStorage.setItem("userTask",JSON.stringify(taskContainer))
      
      
          displayTask();  
        }
      });
  
}
function valiatetaskInput(){
    var regex= /^[A-za-z0-9]{4,15}$/
    var productName=taskInput.value
    if(regex.test(taskInput.value)){
        taskInput.classList.add("is-valid")
        taskInput.classList.remove("is-invalid")
        productName.classList.add("d-none")
    }else{
        taskInput.classList.remove("is-valid")
        taskInput.classList.add("is-invalid")
        productName.classList.remove("d-none")

    }
      
    
}
function valiatenormalInput(){
    var regex= /^(https|google)?[a-z0-9-]+\.[a-z]{2,6}$/
    var productUrl=normalInput.value
    if(regex.test(normalInput.value)){
        normalInput.classList.add("is-valid")
        normalInput.classList.remove("is-invalid")
        productUrl.classList.add("d-none")
    }else{
        normalInput.classList.remove("is-valid")
        normalInput.classList.add("is-invalid")
        productUrl.classList.remove("d-none")

    }
      
    
}

