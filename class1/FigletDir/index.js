const figlet=require("figlet");
// console.log(figlet);

figlet("Satyam kumar Shah",function(err,data){
    if(err){
        console.log("Something went wrong.....")
        console.dir(err);
        return;
    }
    console.log(data);
});