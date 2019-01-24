jQuery(document).ready(function(){
    var deadline = '23 Nov 2017 23:59:59';

    function getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor(t/(1000*60*60*24));
        var weeks = Math.floor( t/(1000*60*60*24*7) );
        var seconds = Math.floor( (t/1000) % 60 );
        return {
            'total': t,
            'weeks': weeks,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    var weeks_class = jQuery(".weeks");
    var days_class = jQuery(".days");
    var hours_class = jQuery(".hours");
    var minutes_class = jQuery(".minutes");
    var minutes_block = jQuery(".minutes_block");
    var weeks_block = jQuery(".weeks_block");

    var timer = null;
    if(Date.parse(deadline) > Date.parse(new Date())){
        jQuery("#black_friday_header").show();
        updateClock(deadline);
        timer = setInterval(function(){
            updateClock(deadline);
        }, 1000);
    }else{
        jQuery("#black_friday_header").hide();
        //minutes_block.show();
        //weeks_block.hide();
    }

    function updateClock(deadline){
        var weeks_count = getTimeRemaining(deadline).weeks;
        //var days_count = (getTimeRemaining(deadline).days % 7 == 0) ? 0 : Math.floor(getTimeRemaining(deadline).days)%7;
        var days_count = Math.floor(getTimeRemaining(deadline).days);
        var hours_count = getTimeRemaining(deadline).hours;
        var minutes_count = getTimeRemaining(deadline).minutes;

        if(weeks_count == 0 && days_count == 0 && hours_count == 0 && minutes_count == 0){
            clearInterval(timer);
        }

        if(days_count < 10){
            days_class.text("0"+days_count);
        }else{
            days_class.text(days_count);
        }

        if(hours_count < 10){
            hours_class.text("0"+hours_count);
        }else{
            hours_class.text(hours_count);
        }

        if(minutes_count < 10){
            minutes_class.text("0"+minutes_count);
        }else{
            minutes_class.text(minutes_count);
        }

        //if(weeks_count >= 1){
        //    //minutes_block.hide();
        //    //weeks_block.show();
        //    if(weeks_count < 10){
        //        weeks_class.text("0"+weeks_count);
        //    }else{
        //        weeks_class.text(weeks_count);
        //    }
        //
        //    if(days_count < 10){
        //        days_class.text("0"+days_count);
        //    }else{
        //        days_class.text(days_count);
        //    }
        //
        //    if(hours_count < 10){
        //        hours_class.text("0"+hours_count);
        //    }else{
        //        hours_class.text(hours_count);
        //    }
        //}else{
        //    //weeks_block.hide();
        //    //minutes_block.show();
        //    if(days_count < 10){
        //        days_class.text("0"+days_count);
        //    }else{
        //        days_class.text(days_count);
        //    }
        //
        //    if(hours_count < 10){
        //        hours_class.text("0"+hours_count);
        //    }else{
        //        hours_class.text(hours_count);
        //    }
        //
        //    if(minutes_count < 10){
        //        minutes_class.text("0"+minutes_count);
        //    }else{
        //        minutes_class.text(minutes_count);
        //    }
        //}
    }
});