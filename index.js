const typinttext=document.querySelector('.typing-text p');
const input=document.querySelector('.input-field');
const btn=document.querySelector('button');
const time=document.querySelector('.time span');
const mistakes=document.querySelector('.mistakes span');
const wpm=document.querySelector('.wpm span');
const cpm=document.querySelector('.cpm span');
let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping = false; 
 function loadParagraph(){
    const para=["Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day"," The writer has no idea what topic the random paragraph will be about when it appears","This forces the writer to use creativity to complete one of three common writing challenges","The writer can use the paragraph as the first one of a short story and build upon it","A second option is to use the random paragraph somewhere in a short story they create","The third option is to have the random paragraph be the ending paragraph in a short story","No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing"];
    const randomIndex=Math.floor(Math.random()*para.length);
    typinttext.innerHTML='';
    for(const char of para[randomIndex]){
        typinttext.innerHTML+=`<span>${char}</span>`;
    }
    typinttext.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typinttext.addEventListener("click",()=>input.focus())
    
 }
function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmval=Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText=wpmval;
    }else{
        clearInterval(timer);
    }
}

 function initTyping(){
   const char=typinttext.querySelectorAll('span');
   const typedChar=input.value.charAt(charIndex);
   if(charIndex<char.length && timeLeft>0){
    if(!isTyping){
        timer= setInterval(initTime,1000);
        isTyping=true;
    }
    if(char[charIndex].innerText === typedChar){
        char[charIndex].classList.add("correct");
        
    }
    else{
        mistake++;
        char[charIndex].classList.add("incorrect");
       
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakes.innerText = mistake;
    cpm.innerText = charIndex-mistake;
   }
   else {
    clearInterval(timer);

   }

}
    function reset(){
        loadParagraph();
        clearInterval(timer);
        timeLeft=maxTime;
        time.innerText=timeLeft;
        input.value='';
        charIndex=0;
        mistake=0;
        isTyping=false;
        wpm.innerText=0;
        cpm.innerText=0;
        mistakes.innerText=0;

    }
 input.addEventListener("input",initTyping);
 btn.addEventListener("click",reset);
 loadParagraph();