export default function searchUser(search, data){

  const isSearch = search === ''

  return isSearch ? data : data.filter(item => {
      return item.login.includes(search) || item.id == search;
  });
}