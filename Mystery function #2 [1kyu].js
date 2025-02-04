function solved(arg) {
    var hash=5381;
    var num=arg&arg;
    while (num!=0&&num!=-1){
    var char=arg&255;
    num>>=8;
      hash = ((hash << 5) + hash) + char;
      hash = hash & hash;
   }
   return hash^5875174;
}