var audio = new window.webkitAudioContext();

var attack = 10,
    decay = 1500,
    gain = audio.createGain(),
    osc = audio.createOscillator();


function createOscillator(freq) {

    if (freq) {
        gain.connect(audio.destination);
        // gain.gain.setValueAtTime(0, audio.currentTime);
        // gain.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000);
        // gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000);

        osc.frequency.value = freq;

        osc.type = "square";
        osc.connect(gain);
        osc.start(0);

        // setTimeout(function() {
        //     osc.stop(0);
        //     osc.disconnect(gain);
        //     gain.disconnect(audio.destination);
        // }, decay)
    }
}

var playerHidden = false;

function initPlayer() {

    document.getElementById('play').addEventListener('click', function() {

        if(osc.playbackState != 0){
        osc.stop(0);
        osc.disconnect(gain);
        gain.disconnect(audio.destination);
        }


        var noteToPlay = '';
        if (sharp) {
            noteToPlay = note + '#' + octave;
        } else {
            noteToPlay = note + octave;
        }

        osc = audio.createOscillator();
        createOscillator(scale[noteToPlay])
    })

    document.getElementById('stop').addEventListener('click', function() {
        osc.stop(0);
        osc.disconnect(gain);
        gain.disconnect(audio.destination);
    })

    document.getElementById('player_toggle').addEventListener('click', function() {

        if(!playerHidden){
            document.getElementById('player').style.bottom = -(document.getElementById('player').offsetHeight) + 'px';
            canvas.style.bottom = (40) + 'px';
            document.getElementById('player_toggle').innerHTML = 'Open Tone Generator';
            playerHidden = true;
        }else{
            document.getElementById('player').style.bottom = '0';
            canvas.style.bottom = (document.getElementById('player').offsetHeight + 40) + 'px';
            document.getElementById('player_toggle').innerHTML = 'Close Tone Generator';
            playerHidden = false;
        }
    })

    document.getElementById('player').style.bottom = -(document.getElementById('player').offsetHeight) + 'px';
    document.getElementById('player').setAttribute('data-animated', 'true');
    canvas.style.bottom = 40 + 'px';
    playerHidden = true;

}
