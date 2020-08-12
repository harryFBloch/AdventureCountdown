

// export const maximalConsecutiveNumbers = (array: Number[]): number => {
//   var longest = 0 // length of longest subsequence of consecutive numbers
//   var current = 1 // length of current subsequence of consecutive numbers

//   for (prev, next) in zip(array, array.dropFirst()) {
//       if next > prev + 1 {
//           // Numbers are not consecutive, start a new subsequence.
//           current = 1
//       } else if next == prev + 1 {
//           // Numbers are consecutive, increase current length
//           current += 1
//       }
//       if current > longest {
//           longest = current
//       }
//   }
//   return longest
// }

// export const getBestStreak = (history: History): number => {
//   const dates = Object.keys(history).map((key) => history[Number(key)].dateCompleted)
//   dates.sort() // Short form for: dates.sort(by: < )
//   let referenceDate = new Date.startOfDay(for: dates.first!)
  
//   let dayDiffs = dates.map { (date) -> Int in
//       calendar.dateComponents([.day], from: referenceDate, to: date).day!
//   }
// }

// export const sortByDate = (sessionHistory: History): string[] => {
//   return Object.keys(sessionHistory).sort((a, b) => {
//     return new Date(sessionHistory[Number(a)].dateCompleted).getTime() - new Date(sessionHistory[Number(b)].dateCompleted).getTime()
//   })
// }

export const longestConsecutive = (num: number[]): number => {
  // if array is empty, return 0
  if (num.length === 0) {
      return 0;
  }

  let set = [];
  let max = 1;

  for (let i=0; i<num.length; i++)
      set.push(num[i]);

  for (let i=0; i<num.length; i++) {
    let left = num[i] - 1;
    let right = num[i] + 1;
    let count = 1;

      while (set.indexOf(left) !== -1) {
          count++;
          set.splice(set.indexOf(left), 1);
          left--;
      }

      while (set.indexOf(right) !== -1) {
          count++;
          set.splice(set.indexOf(right), 1);
          right++;
      }

      max = Math.max(count, max);
  }
  return max;
}

// export const daysBetweenDates = (a: Date, b: Date): number => {
// // To calculate the time difference of two dates 
// let differenceInTime = b.getTime() - a.getTime(); 
  
// // To calculate the no. of days between two dates 
// return differenceInTime / (1000 * 3600 * 24);
// }

// export const getCurrentStreak = (history: History): number => {
//   const daysSinceToday = Object.keys(history).map((id) => 
//     daysBetweenDates(new Date(), new Date(history[Number(id)].dateCompleted)));
//   const filteredDays = daysSinceToday.filter((day) => day !== 0);
//   const sortedDays = filteredDays.sort()
//   let dayFound = false
//   let counter = 0
//   while (counter < sortedDays.length && !dayFound) {
//     if (sortedDays[counter] === counter){
//       counter++;
//     } else {
//       dayFound = true
//     }
//   }
//   return counter
// }

// export const getBestStreak = (history: History): number => {
//   const days = Object.keys(history).map((id) => 
//     daysBetweenDates(new Date(), new Date(history[Number(id)].dateCompleted)));
//   console.log('starting array', days);

//   const longestSec = longestConsecutive(days)
//   console.log(longestConsecutive);
//   return longestSec
// }

export const getTimeRemaining = (endtime: string): {total: number, days: number, minutes: number, seconds: number, hours: number} => {
    const total = Date.parse(endtime) - Date.parse(String(new Date()));
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

export const percentDone = (start: string, end: string): number => {
const today = new Date().getTime();
const s = new Date(start).getTime()
const e = new Date(end).getTime()
 return ((today - s) / (e-s))
}