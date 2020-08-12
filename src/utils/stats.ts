// import { History, Mood } from "../store";
// import { sortByDate } from "./dates";

export type DataArray = {t: Date, y: number}[]

// type LineData = 
//   {[key: string]: {data: {t: Date, y: number}[],  color: string}};


// export const createLineData = (sessionHistory: History): LineData => {
//   const anxietyData = [] as DataArray
//   const stessData = [] as DataArray
//   const happinessData = [] as DataArray

//   const bAnxietyData = [] as DataArray
//   const bStessData = [] as DataArray
//   const bHappinessData = [] as DataArray

//   sortByDate(sessionHistory).forEach((id) => {
//     const session = sessionHistory[Number(id)]

//     anxietyData.push({t: new Date(session.dateCompleted), y: session.afterMood.anxiety})
//     stessData.push({t: new Date(session.dateCompleted), y: session.afterMood.stress})
//     happinessData.push({t: new Date(session.dateCompleted), y: session.afterMood.happiness})

//     bAnxietyData.push({t: new Date(session.dateCompleted), y: session.beforeMood.anxiety})
//     bStessData.push({t: new Date(session.dateCompleted), y: session.beforeMood.stress})
//     bHappinessData.push({t: new Date(session.dateCompleted), y: session.beforeMood.happiness})
//   })

//   const data: LineData = {
//     anxiety: {data: anxietyData, color: '#8E9CA3'},
//     stress: {data: stessData, color: '#D08A4A'},
//     happiness: {data: happinessData, color: "#B93F24"},
//   }
//   return data;
// }

// export const getZenScoreData = (sessionHistory: History): LineData => {
//   const data = sortByDate(sessionHistory).map((id) => {
//     const session = sessionHistory[Number(id)]
//     const beforeScore = 15 + session.beforeMood.happiness - session.beforeMood.anxiety - session.beforeMood.stress
//     const afterScore = 15 + session.afterMood.happiness - session.afterMood.anxiety - session.afterMood.stress 
//     const zenScore = beforeScore + afterScore

//     return {t: new Date(session.dateCompleted), y: zenScore * 2}
//   })
//   return {zenScore: {data: data, color: '#D08A4A'}}
// }

// export const getDataForMood = (sessionHistory: History, key: keyof Mood, colorB: string, colorA: string): LineData => {
//   const beforeData = [] as DataArray
//   const afterData = [] as DataArray

//   sortByDate(sessionHistory).forEach((id) => {
//     const session = sessionHistory[Number(id)]

//     beforeData.push({t: new Date(session.dateCompleted), y: session.beforeMood[key]})
//     afterData.push({t: new Date(session.dateCompleted), y: session.afterMood[key]})
//   })
//   const data: LineData = {Before: {data: beforeData, color: colorB}, After: {data: afterData, color: colorA}}
//   return data
// }

// export const getAverage = (sessionHistory: History, key: keyof Mood): number => {
//   let counter = 0
//   let total = 0
//   Object.keys(sessionHistory).forEach((id) => {
//     const session = sessionHistory[Number(id)]
//     total += session.afterMood[key]
//     total += session.beforeMood[key]
//     counter = counter + 2;
//   })
//   return Math.ceil(total / counter)
// }

// export const getAverageZen = (sessionHistory: History): number => {
//   const zenScoreData = getZenScoreData(sessionHistory);
//   let total = 0;
//   zenScoreData.zenScore.data.forEach((score) => total += score.y)
//   return Math.ceil(total/zenScoreData.zenScore.data.length)
// }