const START_BUTTON = document.querySelector('.Start');
const LAP_BUTTON = document.querySelector('.Lap');
const RESET_BUTTON = document.querySelector('.Reset');
const CLEAR_BUTTON = document.querySelector('.Clear');

const HOURS_DISPLAY = document.querySelector('.Hours');
const MINUTES_DISPLAY = document.querySelector('.Minutes');
const SECONDS_DISPLAY = document.querySelector('.Seconds');
const MILLISECONDS_DISPLAY = document.querySelector('.Milliseconds');

const LAP_LIST = document.querySelector('.lap-list')

class Timer{
    constructor(){
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
        this.milliseconds = '00';

        this.hours_interval = null;
        this.minutes_interval = null;
        this.seconds_interval = null;
        this.milliseconds_interval = null;


        this.laps = [];
    }

    normalize_text(value){
        if(value < 10){
            return '0' + Number(value);
        }else{
            return value;
        }
    }

    start(){

        this.milliseconds_interval = setInterval(() => {
            
            if(this.milliseconds == 99){
                this.milliseconds = '00';
                this.seconds++;
            }else{
                this.milliseconds++;
            }

            if(this.seconds == 60){
                this.seconds = '00';
                this.minutes++;
            }

            if(this.minutes == 60){
                this.minutes = '00';
                this.hours++;
            }

        }
        , 10);   

        // interval update 
        setInterval(() => {
            this.update_display();
        }, 10);

    }


    stop(){

        clearInterval(this.hours_interval);
        clearInterval(this.minutes_interval);
        clearInterval(this.seconds_interval);
        clearInterval(this.milliseconds_interval);

    }

    reset(){
            
        this.hours = '00';
        this.minutes = '00';
        this.seconds = '00';
        this.milliseconds = '00';

        this.update_display();
    
    }

    update_display(){
            
        HOURS_DISPLAY.innerHTML = this.hours;
        MINUTES_DISPLAY.innerHTML = this.minutes;
        SECONDS_DISPLAY.innerHTML = this.seconds;
        MILLISECONDS_DISPLAY.innerHTML = this.milliseconds;

    }

    lap(){
        let lap = {
            hours: this.normalize_text(this.hours),
            minutes: this.normalize_text(this.minutes),
            seconds: this.normalize_text(this.seconds),
            milliseconds: this.normalize_text(this.milliseconds)
        }

        LAP_LIST.appendChild(this.get_lap_dom(lap));
    }
    
    get_lap_dom(lap){
        let node = document.createElement('li');
        node.classList.add('lap-item');
        node.innerHTML = 
        `<div class='time-slot'>
        <span class='Hours'>${lap.hours}</span>
        </div>
        :
        <div class='time-slot'>
            <span class='Minutes'>${lap.minutes}</span>
        </div>
        :
        <div class='time-slot'>
            <span class='Seconds'>${lap.seconds}</span>
        </div>
        :
        <div class='time-slot'>
            <span class='Milliseconds'>${lap.milliseconds}</span>
        </div>`

        return node
    }

    clearLap(){
        LAP_LIST.innerHTML = `
        <li class="lap-item">
                    <div class='time-slot'>
                        <span class='Hours'>HH</span>
                    </div>
                    :
                    <div class='time-slot'>
                        <span class='Minutes'>MM</span>
                    </div>
                    :
                    <div class='time-slot'>
                        <span class='Seconds'>SS</span>
                    </div>
                    :
                    <div class='time-slot'>
                        <span class='Milliseconds'>mm</span>
                    </div>
                </li>
                `;
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
    START_BUTTON.innerText = 'Start';
});

LAP_BUTTON.addEventListener('click', () => {
    TIMER.lap();
});

CLEAR_BUTTON.addEventListener('click', () => {
    TIMER.clearLap();
})