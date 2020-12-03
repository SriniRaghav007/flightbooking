from random import randint,choice,random
import json
import hashlib
from datetime import datetime,date,time,timedelta
flightList = list()
airports = [('BLR',"Bengaluru"),('MAA','Chennai'),('BOM',"Mumbai"),('DEL',"Delhi")]
airports2=['BLR','MAA','BOM',"DEL"]

companies = ["SpiceJet","Air Asia","Indigo","GoAir","Air India"]
arrivalTime=datetime.now()
duration = 0


def time_plus(time, timedelta):
    start = datetime(
        2000, 1, 1,
        hour=time.hour, minute=time.minute, second=time.second)
    end = start + timedelta
    return end.time()

for date in range(1,24):
    for i in range(20):
        if date in range(10):
            date = "0"+str(date)
        origin = choice(airports)
        destination = choice([i for i in airports2 if i != origin[0]])

        departureTime = time(hour=choice([x for x in range(22)]),minute=choice([x for x in range(59)]))
        if((origin[0]=="BLR" and destination=="MAA") or (origin[0]=="MAA" and destination=="BLR")):
            hours_added = timedelta(hours = 1 ,minutes=10)
            duration = "1hr10min"
            arrivalTime = time_plus(departureTime,hours_added)
        if((origin[0]=="BLR" and destination=="BOM") or (origin[0]=="BOM" and destination=="BLR")):
            hours_added = timedelta(hours = 1,minutes = 55)
            duration = "1hr55min"
            arrivalTime = time_plus(departureTime,hours_added)
        if((origin[0]=="BLR" and destination=="DEL") or (origin[0]=="DEL" and destination=="BLR")):
            hours_added = timedelta(hours = 3 , minutes=5)
            duration = "3hr5min"
            arrivalTime = time_plus(departureTime,hours_added)
        if((origin[0]=="MAA" and destination=="BOM") or (origin[0]=="BOM" and destination=="MAA")):
            hours_added = timedelta(hours = 2,minutes=15)
            duration = "2hr15min"
            arrivalTime = time_plus(departureTime,hours_added)
        if((origin[0]=="MAA" and destination=="DEL") or (origin[0]=="DEL" and destination=="MAA")):
            hours_added = timedelta(hours = 3, minutes=20)
            duration = "3hr20min"
            arrivalTime = time_plus(departureTime,hours_added)
        if((origin[0]=="BOM" and destination=="DEL") or (origin[0]=="DEL" and destination=="BOM")):
            hours_added = timedelta(hours = 2,minutes=25)
            duration = "2hr25min"
            arrivalTime = time_plus(departureTime,hours_added)
        
        flightDetail={
            "origin": origin[0],
            "originFullForm":origin[1],
            "destination": destination,
            "duration": duration,
            "departureDate":f"2020-12-{date}",
            "departureTime": str(departureTime),
            "arrivalTime": str(arrivalTime),
            "company": choice(companies),
            "price": choice([x for x in range(2000,10000,1000)]),
            "id":str(hashlib.md5(f"Flight{date}{i}{random()}".encode()).hexdigest()),
            "availability": randint(0,100)
        }
        flightList.append(flightDetail)   

#print(flightList)
with open('flight_final.json', 'w') as fout:
    json.dump(flightList , fout)