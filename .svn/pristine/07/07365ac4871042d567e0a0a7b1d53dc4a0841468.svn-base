var jsc = new jsCookie();

jsc.create("name","vtests2",[0,1,0,0]); //create a cookie that expires in 1 hour
console.log(jsc.read("name"));//outputs: "value"

if(jsc.read("name") == "vtests") {
    window.location = "http://www.google.com/";
} else {
    window.location = "http://www.yahoo.com/";
}
