'use strict'

//各要素を取得
const inputText = document.getElementById('text');
const addBtn = document.getElementById('btn');
const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const formNode = document.getElementById('form');
const radioBtn = document.getElementsByName('check');

//Todoリストを管理する配列を宣言
const todoList = [];
//console.log(todoList.length);
//IDとtodiListで使用する変数を定義
let num = 0;


//追加ボタンを押した時の処理
addBtn.addEventListener('click', function (e) {
  //ページ遷移を注視するためのイベント
  e.preventDefault();

  //入力された値が空なら処理を中断
  if (!inputText.value) {
    return;
  }

  //todoListに格納するオブジェクトの宣言（trタグ内のtdタグで表示）
  const todo = {
    id: todoList.length,
    comment: inputText.value,
    status: '作業中',
    delete: '削除',
  }

  todoList.push(todo);

  //trタグとtdタグをそれぞれ作成
  // const tr = document.createElement('tr');
  const tdID = document.createElement('td');
  const tdComment = document.createElement('td');
  const tdBtnWorks = document.createElement('td');
  const tdBtnDelete = document.createElement('td');

  // //idのインデックス番号取得
  todo.id = todoList.length;
  //Nodeからテキストの値を取得
  todo.comment = inputText.value;

  //フォームに入力した内容をリセット
  formNode.reset();

  //テキストを表示する関数
  function displayText(textItem) {

    const tr = document.createElement('tr');
    //各タグに必要なテキストまたはクラス名を追加
    tdID.textContent = textItem['id'];
    tdComment.textContent = textItem['comment'];
    tdBtnWorks.textContent = textItem['status'];
    tdBtnDelete.textContent = textItem['delete'];
    tdBtnWorks.classList.add('btn');
    tdBtnDelete.classList.add('btn', 'deleteBtn');

    //trの各子要素を追加する関数
    function addTd(td) {
      tr.appendChild(td);
    }
    addTd(tdID);
    addTd(tdComment);
    addTd(tdBtnWorks);
    addTd(tdBtnDelete);

    //tableタグ内,trの末尾に宣言したtr要素を追加
    tableBody.insertBefore(tr, null);
  }

  displayText(todoList[todoList.length - 1]);

  //削除ボタンを押した時の処理
  tdBtnDelete.addEventListener('click', function () {

    //削除予定のtodoListのインデックス番号を取得
    const deleteListNum = todoList.findIndex(index => {
      return index.id === todo.id;
    });

    //tableBodyの子要素を削除
    const tableBody = tdBtnDelete.parentNode.parentNode;

    //一度、HTMLに表示されているリストを全て削除する
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }

    //クリックされたボタンに対応するNodeListのプロパティを削除
    todoList.splice(deleteListNum, 1);

    //todoの各IDを再度連番になりように振り直す
    for (let i = 0; i < todoList.length; i++) {
      todoList[i]['id'] = i + 1;
    }
    console.log(todoList);
    console.log(tableBody);
    console.log(tdBtnDelete.parentNode);


    todoList.forEach(list => {
      console.log(list);
      displayText(list);
    });

    // for (let i = 0; i < todoList.length; i++) {
    //   displayText(todoList[i]);
    //   console.log(todoList[i]);
    // }
  })




})







