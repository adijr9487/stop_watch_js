const START_BUTTON = document.querySelector('.Start');
const LAP_BUTTON = document.querySelector('.Lap');
const RESET_BUTTON = document.querySelector('.Reset');

const HOURS_DISPLAY = document.querySelector('.Hours');
const MINUTES_DISPLAY = document.querySelector('.Minutes');
const SECONDS_DISPLAY = document.querySelector('.Seconds');
const MILLISECONDS_DISPLAY = document.querySelector('.Milliseconds');

class Timer{
    constructor(){
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;

        this.hours_interval = null;
        this.minutes_interval = null;
        this.seconds_interval = null;
        this.milliseconds_interval = null;


        this.laps = [];
    }

    start(){

        this.hours_interval = setInterval(() => {
            if(this.hours == 23){
                this.hours = 0;
            }else{
                this.hours++;
            }
            HOURS_DISPLAY.innerHTML = this.hours;
        }
        , 60*60*1000);

        this.minutes_interval = setInterval(() => {
            if(this.minutes == 59){
                this.minutes = 0;
            }else{
                this.minutes++;
            }
            MINUTES_DISPLAY.innerHTML = this.minutes;
        }
        , 60*1000);

        this.seconds_interval = setInterval(() => {
            if(this.seconds == 59){
                this.seconds = 0;
            }else{
                this.seconds++;
            }
            SECONDS_DISPLAY.innerHTML = this.seconds;
        }
        , 1000);

        this.milliseconds_interval = setInterval(() => {
            if(this.milliseconds == 99){
                this.milliseconds = 0;
            }else{
                this.milliseconds++;
            }
            MILLISECONDS_DISPLAY.innerHTML = this.milliseconds;
        }
        , 10);

    }


    stop(){

        clearInterval(this.hours_interval);
        clearInterval(this.minutes_interval);
        clearInterval(this.seconds_interval);
        clearInterval(this.milliseconds_interval);

    }

    reset(){
            
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;

        this.update_display();
    
    }

    update_display(){
            
        HOURS_DISPLAY.innerHTML = this.hours;
        MINUTES_DISPLAY.innerHTML = this.minutes;
        SECONDS_DISPLAY.innerHTML = this.seconds;
        MILLISECONDS_DISPLAY.innerHTML = this.milliseconds;


    }

    lap(){
        this.laps.push({
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds,
            milliseconds: this.milliseconds
        });
    }

    clearLap(){
        this.laps = [];
    }
}

const TIMER = new Timer();

START_BUTTON.addEventListener('click', () => {
    if(START_BUTTON.innerText == 'Start' || START_BUTTON.innerText == 'Resume'){
        TIMER.start();
        RESET_BUTTON.setAttribute('disabled', true);
        START_BUTTON.innerText = 'Stop';
    }else if(START_BUTTON.innerText == 'Stop'){
        TIMER.stop();
        RESET_BUTTON.removeAttribute('disabled');
        START_BUTTON.innerText = 'Resume';
    }
});


RESET_BUTTON.addEventListener('click', () => {
    TIMER.reset();
});

LAP_BUTTON.addEventListener('click', () => {
    TIMER.lap();
});