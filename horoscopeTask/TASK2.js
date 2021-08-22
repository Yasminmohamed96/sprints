const getName=function()
{
    let flag=false;
    let userName=prompt("please enter your name :");
    while (flag==false)
    {
         
        if (isNaN(userName))
        {
            flag=true;
        }
        else if (userName==null) break;
        else 
        {
            userName=prompt("please enter your name :");
        }
    }

    return userName;
}

const getBirthMonth=function()
{
    let flag=false;
    let userMonth=parseInt(prompt("please enter your birth month :"));
    while(flag==false)
    {
        if (!isNaN(userMonth)&&(userMonth<=12)&&(userMonth>=1))
        {
            flag=true;
        }
        else if (userMonth==null) break;
        else
        {
            userMonth=prompt("please enter your birth month :");
        }
    }
    return userMonth;

}

const getBirthDay=function()
{
    let flag=false;
    let userDay=parseInt(prompt("please enter your birth day :"));
    while(flag==false)
    {
        if (!isNaN(userDay)&&(userDay>=1)&&(userDay<=31))
        {
            flag=true;
        }
        else if (userDay==null) break;
        else
        {
            userDay=prompt("please enter your birth day :");
        }
    }
    return userDay;

}

const getHoroscope =function(userName,userMonth,userDay)
{

    if ((userMonth == 1 && userDay >= 20 )|| (userMonth == 2 && userDay <= 18))
    {
        alert('hi '+userName+" your horoscope is Aquarius");
    }
    if ((userMonth == 2 && userDay >= 19) || (userMonth == 3&& userDay <= 20))
    {
        alert('hi '+userName+" your horoscope is Pisces");
    }
    if ((userMonth == 3&& userDay >= 21) || (userMonth == 4 && userDay <= 19))
    {
        alert('hi '+userName+" your horoscope is Aries");
    }
    if ((userMonth == 4&& userDay >= 20)||( userMonth == 5 && userDay <= 20))
    {
         alert('hi '+userName+" your horoscope is Taurus");
    }
    if ((userMonth == 5&& userDay >= 21) ||( userMonth == 6 && userDay <= 20))
    {
        alert('hi '+userName+" your horoscope is Gemini");
    }
    if ((userMonth == 6&& userDay >= 21 )||( userMonth == 7&& userDay <= 22))
    {
        alert('hi '+userName+" your horoscope is Cancer");
    }
    if ((userMonth == 7&& userDay >= 23) || (userMonth == 8 && userDay <= 22))
    {
         alert('hi '+userName+" your horoscope is Leo");
    }
    if ((userMonth == 8 && userDay >= 23 )|| (userMonth == 9 && userDay <= 22))
    {
        alert('hi '+userName+" your horoscope is Virgo");                   
    }
    if ((userMonth == 9&& userDay >= 23) ||( userMonth == 10&& userDay <= 22))
    {
        alert('hi '+userName+" your horoscope is Libra");
    }
    if ((userMonth == 10 && userDay >= 23)|| (userMonth == 11 && userDay <= 21))
    {
        alert('hi '+userName+" your horoscope is Scorpio");
    }
    if ((userMonth == 11 && userDay >= 22) || (userMonth == 12 && userDay <= 21))
    {
        alert('hi '+userName+" your horoscope is Sagittarius");
    }
    if((userMonth == 12 && userDay >= 22) || (userMonth == 1 && userDay <= 19))
    {
        alert('hi '+userName+" your horoscope is Capricorn");                 
    }

}


userName=getName();
count =3;

if (userName !=null)
{
    while(count>0)
    {
        userPassword=prompt("please enter your password :");
        if(userPassword=='123')
        {
            var userMonth=getBirthMonth();
            if(userMonth!=null)
            {
            var userDay=getBirthDay();
            getHoroscope(userName,userMonth,userDay);
            break;
            }
            else 
            {
                break;
            }
        }
        else if (userPassword==null) break;
        else
        {
            count--;
        }
    }

    if (count==0 )
    {
        alert("you have entered the wrong password 3 times ");
    }
}    