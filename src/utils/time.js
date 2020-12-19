import moment from 'moment';

export const  timeStamp = (time) => {
    //moment(message.createdAt.toDate()).format('dddd')  today
   // console.log(moment().subtract(1, 'days').format('dddd')) yesterday
    if( (moment().format('dddd')) ===  moment(time?.toDate()).format('dddd')){
         return `Today ${moment(time?.toDate())?.format('h:mm a')}`
    }
    else if(moment().subtract(1, 'days').format('dddd') ===  moment(time?.toDate())?.format('dddd')){
        return `Yesterday ${moment(time?.toDate())?.format('h:mm a')}`
    }
    else{
         return moment(time?.toDate())?.format('dddd,  h:mm a')
    }

}
