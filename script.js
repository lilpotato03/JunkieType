//selecting elements
const typingarea=document.querySelector('.typingtext')
const body=document.querySelector('body')
let texts=document.querySelector('.maintype')
let actual=document.createElement('div')
const keys=document.querySelectorAll('.key')
const ptags=document.querySelectorAll('.times')
const timer=document.querySelector('.timer')
let backtype=document.querySelector('.backtype')
let keylen=keys.length
const theme_con=document.querySelector('.theme-con')
const theme_button=document.querySelector('.theme_icon')
let temp=document.createElement('p')
const refresh=document.querySelector('.refresh_icon')
//dictionary
let eng100=['time','year','people','way','day','man','thing','woman','life','child','world','school','state','family','student','group','country','problem','hand','part','place','case','week','company','system','program','question','work','government','number','night','point','home','water','room','mother','area','money','story','fact','month','lot','right','study','book','eye','job','word','business','issue','side','kind','head','house','service','friend','father','power','hour','game','line','end','member','law','car','city','community','name','president','team','minute','idea','kid','body','information','back','parent','face','others','level','office','door','health','person','art','war','history','party','result','change','morning','reason','research','girl','guy','moment','air','teacher','force','education']
//initializing svalues
let para=""
let words=10
let pointer=1
let timevalue=0.0
let timerid=''
let timerflag=0
timer.textContent=timevalue.toFixed(1)
const texts_temp=document.createElement('p')
texts_temp.classList.add('correct')
texts_temp.innerHTML='&nbsp;'
temp.append(texts_temp)
//initial flow
timer_config()
theme_config()
//initial word seleciton
para=select_words(para)
para=para.concat(""," ")
add_maintext(para.slice(1))
//takes key inputs
take_input()
//themeing initialised
refresh.addEventListener('click',reset_text)
theme_button.addEventListener('click',themes_display)
function take_input(){
    document.addEventListener('keydown',function keypress(Event){
        key=Event.key
        if(key==='Ctrl'||key==='Alt'||key==='Shift'){

        }
        else if(key==='Tab'){
            stop_timer()
            reset_timer()
            reset_text()
        }
        else{
            set_timer()
            add_key(key)
            move_cursor(pointer)
            keypress_animation(key)
            if(pointer===para.length-1){
                actual.lastChild.classList.add('end')
                stop_timer()
                check_result()
                reset_timer()
                reset_text()
                }
            }
        }
    ) 
}
function gen_words(passage){
    let all_words=[]
    let temp_word=""
    let temp_el=document.createElement('p')
    temp_el.innerHTML=passage
    const items=temp_el.querySelectorAll('p')
    const len=items.length
    for(let i=0;i<len;i++){
        let key=items[i]
        let char=key.innerHTML
        if(key.classList.contains('start')){
            temp_word=temp_word.concat("",char)
            i++
            key=items[i]
            while(key.classList.contains('end')!=true){
                char=key.innerHTML
                temp_word=temp_word.concat("",char)
                i++
                key=items[i]
            }
            if(key.classList.contains('end')){
                char=key.innerHTML
                temp_word=temp_word.concat("",char)
                all_words.push(temp_word)
                temp_word=""
            }
        }
    }
    return(all_words)
}
function check_result(){
    const disp_time=document.querySelector('.disp_time')
    const disp_wpm=document.querySelector('.disp_wpm')
    const disp_acc=document.querySelector('.disp_acc')
    const og=gen_words(backtype.innerHTML)
    const act=gen_words(actual.innerHTML)
    console.log(og)
    let letcount=0
    for(let j=0;j<og.length;j++){
        letcount=letcount+og[j].length
    }
    letcount=Math.floor(letcount/4)
    console.log(act)
    let count=0
    let timet=timevalue.toFixed(1)
    for(let i=0;i<og.length;i++){
        if(og[i]===act[i])
        count++
    }
    let accuracy=((count/(og.length)).toFixed(2))*100
    if(letcount>count)
        count=letcount
    let wpm=Math.floor((count/(timet/60.0))*(accuracy/100).toFixed(2))
    disp_time.textContent=('time:'+timet+'s')
    disp_wpm.textContent=('wpm:'+wpm)
    disp_acc.textContent=('accuracy:'+accuracy+'%')
}
//adds keys
function add_key(key){
    let actualkey=document.createElement('p')
    let addkey=document.createElement('p')
    if(key>='a'&&key<='z'&&key.length===1||key>='A'&&key<='Z'&&key.length===1){
        if(key===para[pointer]){
            
            if(para[pointer-1]===' '){
                addkey.innerHTML=para[pointer]
                addkey.setAttribute('class','start correct')
                actualkey.innerHTML=key
                actualkey.setAttribute('class','correct start')
            }
            else{
            addkey.innerHTML=para[pointer]
            addkey.setAttribute('class','correct')
            actualkey.innerHTML=key
            actualkey.setAttribute('class','correct')
            }
        }
    else{
            if(para[pointer-1]===' '){
            addkey.innerHTML=para[pointer]
            addkey.setAttribute('class','start incorrect')
            actualkey.innerHTML=key
            actualkey.setAttribute('class','incorrect start')
            }
            else if(para[pointer]===' '){
                addkey.innerHTML='&nbsp;'
                addkey.setAttribute('class','incorrect end')
                addkey.setAttribute('style','background-color:var(--incorrect)')
                actualkey.innerHTML=key
                actualkey.setAttribute('class','incorrect end')
            }
            else{
            addkey.innerHTML=para[pointer]
            addkey.setAttribute('class','incorrect')
            actualkey.innerHTML=key
            actualkey.setAttribute('class','incorrect')
            }
        }
        pointer++
        temp.appendChild(addkey)
        actual.appendChild(actualkey)
        texts.innerHTML=temp.innerHTML
    }
    else if(key===' '){
        if(key===para[pointer]){
            addkey.innerHTML='&nbsp;'
            addkey.setAttribute('class','correct')
            temp.appendChild(addkey)
            actual.lastChild.classList.add('end')
            pointer++
        }
        else{
            temp.lastChild.classList.add('end')
            let p=pointer-1
            while(para[p]!=' '){
                let addkey2=document.createElement('p')
                addkey2.innerHTML='&nbsp;'
                addkey2.setAttribute('class','corrrect')
                addkey2.classList.add('filler')
                addkey2.removeAttribute('style')
                temp.appendChild(addkey2)
                p++
            }
            p++
            pointer=p
            actual.lastChild.classList.add('end')
        }
        texts.innerHTML=temp.innerHTML

    }
    else if(key==='Backspace'){
        const textptags=backtype.querySelectorAll('p')
        const textall=texts.querySelectorAll('p')
        const tempall=temp.querySelectorAll('p')
        templen=tempall.length
        textlen=textall.length
        if(temp.lastChild.classList.contains('filler')){
            while(temp.lastChild.classList.contains('filler')){
                temp.removeChild(temp.lastChild)
                texts.removeChild(texts.lastChild)
                pointer--
            }
        }
        temp.removeChild(temp.lastChild)
        texts.removeChild(texts.lastChild)
        actual.removeChild(actual.lastChild)
        textptags[pointer].removeAttribute('style')
        pointer--
    }
    else if(key==='Shift')
    {

    }

}
//sets the paragraph to be typed
function add_maintext(string){
    string=" ".concat("",string)
        const temppara=document.createElement('p')
        for(let j=0;j<string.length;j++){
            const addkey=document.createElement('p')
            const tempa=temppara.querySelectorAll('p')
            const len=tempa.length
            const key=string[j]
            if(key>='a'&&key<='z'&&key.length===1||key>='A'&&key<='Z'&&key.length===1){
                    addkey.innerHTML=key
                    addkey.setAttribute('class','backed')
                    if(tempa[len-1].innerHTML==='&nbsp;'){
                        addkey.classList.add('start')
                    }
                    temppara.appendChild(addkey)
            }
            else if(key===' '){
                addkey.innerHTML='&nbsp;'
                addkey.setAttribute('class','backed')
                addkey.classList.add('space')
                if(j!=0){
                    tempa[len-1].classList.add('end')
                }
                temppara.appendChild(addkey)
            }
        }
        backtype.innerHTML=temppara.innerHTML
}
//set the timer config
function timer_config(){
    console.log(texts.innerHTML)
    for(let k=0;k<ptags.length;k++){
        ptags[k].addEventListener('click',function(){
            words=parseInt(ptags[k].innerText)
            console.log(words)
            reset_text()
        })
    }
}
//moves the cursor while typing
function move_cursor(pointer){
    const textptags=backtype.querySelectorAll('p')
    if(pointer===0){
        textptags[0].setAttribute("style","text-decoration: underline;text-decoration-thickness:1px;text-decoration-color:var(--cursor);text")
    }
    else if(pointer==para.length-1){

    }
    else{
        textptags[pointer].setAttribute("style","text-decoration: underline;text-decoration-thickness:1px;text-decoration-color:var(--cursor);text")
        for(let i=0;i<pointer;i++)
            textptags[i].removeAttribute('style')
    }
    
}
//used to select the words for paragraph
function select_words(para){
    for(let j=0;j<words;j++){
        let index=Math.floor(Math.random()*eng100.length)
        para=para.concat(" ",eng100[index])
    }
    return para
}
//theme visibility toggle
function themes_display(){
    const theme_tags=theme_con.querySelectorAll('.tags')
    console.log()
    for(let j=0;j<theme_tags.length;j++){
        console.log(theme_tags[j])
        const shades=theme_tags[j].querySelectorAll('.shades')
        if(Boolean(theme_tags[j].getAttribute('hidden'))){
            theme_tags[j].removeAttribute('hidden')
            for(let i=0;i<shades.length;i++){
                shades[i].removeAttribute('hidden')
            }
        }
        else{
            theme_tags[j].setAttribute('hidden','yescon')
            for(let i=0;i<shades.length;i++){
                shades[i].setAttribute('hidden','yes')
            }
        }
    }    
}
//configring themes
function theme_config(){
    const theme_tags=theme_con.querySelectorAll('.tags')
    for(let j=0;j<theme_tags.length;j++){
        tag=theme_tags[j]
        tag.addEventListener('click',function(){
            let classes=this.getAttribute('class')
            classes=classes.split(' ')
            const current_theme=classes[2]
            console.log(classes)
            console.log(current_theme)
            console.log(this)
            body.setAttribute('class',current_theme)
        })
        
    }
}
//keyboard animations
function keypress_animation(press){
    press=press.toUpperCase()
    if(press===' '){
        const spacebar=document.querySelector('.spacebar')
        spacebar.classList.add('pressed')
                setTimeout(function(){
                    spacebar.classList.remove('pressed')
                },100)
    }
    else{
        for(let i=0;i<keys.length;i++){
            if(press===keys[i].innerText){
                keys[i].classList.add('pressed')
                setTimeout(function(){
                    keys[i].classList.remove('pressed')
                },100)
            }
        }
    }
}
//resetting the text
function reset_text(){
    texts.innerHTML=" "
    pointer=1
    para=""
    para=select_words(para)
    para=para.concat(""," ")
    add_maintext(para.slice(1))
    const texts_temp3=document.createElement('p')
    const texts_temp2=document.createElement('p')
    texts_temp2.classList.add('correct')
    texts_temp2.innerHTML='&nbsp;'
    texts_temp3.appendChild(texts_temp2)
    temp.innerHTML=texts_temp3.innerHTML
    actual.innerHTML=" "
    stop_timer()
    reset_timer()
}
function timer_inc(){
    timevalue=timevalue+0.1
    timer.textContent=timevalue.toFixed(1)
}
function stop_timer(){
    clearInterval(timerid)
    timerflag=0
}
function set_timer(){
    if(timerflag===0){
        timerflag=1
        timerid=setInterval(timer_inc,100)
    }
}
function reset_timer(){
    timevalue=0.0
    timer.textContent=timevalue.toFixed(1)
    timerflag=0
}







