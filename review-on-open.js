import {dueReviewWindow,buildReview} from './domain.js';

export function createOpenReview({loadState,writeReview,replaceState,onReview,now=()=>new Date(),lock=globalThis.navigator?.locks}){
 let pending=null;
 async function work(){
  const state=await loadState(),date=now(),window=dueReviewWindow(state.settings,date);
  if(!window||state.reviews.some(r=>r.id===window.key))return false;
  if(new Date(window.end)>date)window.end=date.toISOString();
  const review=buildReview(state.captures,window,date);
  await writeReview(review);
  replaceState(await loadState());
  if(review.captureIds.length)onReview(review);
  return true;
 }
 return function catchUp(){
  if(pending)return pending;
  pending=(lock?lock.request('echo-periodic-review',work):work()).finally(()=>{pending=null});
  return pending;
 };
}
