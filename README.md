<h1 align="center">Проект <a style="color: #4285B4;" href="https://daniilshat.ru/" target="_blank">mesto-react</a> 
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=435&lines=click+here+to+view+the+web-site" alt="Typing SVG" style="height: 30px" />

---

<div align="center" ><img src="./src/images/README/main.jpg" width="580" /></div>

<div align="center">

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

</div>

---

<h2 style="color: #4285B4;" >Скачать:</h2>

```
git clone https://github.com/Shekko777/mesto-react.git
```

<p>Включить локальный сервер в проекте:</p>

```
npm run start
```

---

<h2 style="color: #4285B4;">О проекте:</h2>

<p style="width: 600px; font-weight: 500">Адаптированное <span style="padding: 5px; background-color: #F5F5F5; font-weight: 700;">web-приложение</span> с настройкой личного профиля и общей базой данных карточек на сервере. Загрузка информации происходит через API с fetch запросами. Приложение разрабатывалось на React с использованием функциональных компонентов.</p>

<a href="https://github.com/Shekko777/mesto" style="font-weight: 700;">Mesto</a> в версии обычного сайта

---

<div style="display: flex; align-items: start; margin-bottom: 20px;"><h2 style="color: #4285B4; display: inline; margin-right: 20px;">Работа с кодом:</h2> <img src="https://media.giphy.com/media/ptqAPgghLtHOa0SLJS/giphy.gif" height="100" /> </div>

<p style="width: 600px; font-weight: 500">1. Для добавления различных форм используется функциональный компонент общей формы:</p>

```
  <PopupWithForm name={name} title={title} buttonText={buttonText} isOpen={isOpen} isClose={isClose}>
    {props.child} // Передача разных друг от друга инпутов.

    /*
      Пример:
      <input defaultValue="" type="URL" placeholder="URL" required />
    */
  </PopupWithForm>

```

<p style="width: 600px; font-weight: 500">2. Для передачи различных состояний используется стейт из коробки React:</p>

```
  const [active, setActive] = React.useState(false);
```

<p style="width: 600px; font-weight: 500">После чего можно применять его в функциях для изменения активных состояний</p>

```
  function onClickButton() {
    setActive(!active);
  }

  <Main onClick={onClickButton} />
```

<p style="width: 600px; font-weight: 500">3. Запрос данных сервера происходит через хук <span style="padding: 5px; background-color: #F5F5F5;">React.useEffect()</span> при старте страницы:</p>

```
  React.useEffect(() => {
    // your function

  }, [] /*Обязательный массив зависимостей, иначе будет утечка памяти. Можно оставить пустым, если зависимостей нет*/)
```

<p style="width: 600px; font-weight: 500">4. Для создания карточек используется функциональный компонент, в который передаётся key из card._id:</p>

```
  cards.map(card => {
    <Card key={card._id} onCardClick={onCardClick} card={card}/>
  })
```

---

<h2 style="color: #4285B4;"> Скринкаст приложения:</h2>

<div align="center">

  <h4>Настройка собственного профиля</h4>

<img src="./src/images/README/profile.jpg" width="500" />

<h4>Обновление аватара</h4>

<img src="./src/images/README/avatar.jpg" width="500" />

<h4>Обновление профиля</h4>

<img src="./src/images/README/editProfile.jpg" width="500" />

<h4>Добавление нового места</h4>

<img src="./src/images/README/addNewMesto.jpg" width="500" />
</div>

<h3 style="opacity: 0.3;">© Created by Shekko.</h3>
