let buildItems=(inputs)=>{
  let allItems=loadAllItems();
  let itemCount=[];
  for(let input of inputs){
    let splitInput=input.split('-');
    let barcode=splitInput[0];
    let count=parseFloat(splitInput[1]||1);
    let cartItem=itemCount.find(cartItem=>cartItem.item.barcode===barcode);
    if(cartItem){
      cartItem.count+=count;
    }
    else{
      let item=allItems.find(item=>item.barcode===barcode);
      itemCount.push({item:item,count:count});
    }
  }
  return itemCount;
}
