import Header from './components/Header';
import Book from './components/Book';

function App() {
  return (
    <div>
      <Header />
      <main>
        <div className='container'>
          <h2>Популярные книги</h2>
          <div className="books">
            <Book title={'Старик и море. Зеленые холмы арфики'} author={'Эрнест Хемингуэй'} year={'1935'} pages={'310'} price={'199'} cover={'/img/books/The-Old-Man-and-the-Sea.jpg'} />
            <Book title={'На западном фронте без перемен'} author={'Эрих Мария Ремарк'} year={'1929'} pages={'200'} price={'149'} cover={'/img/books/All-Quiet-on-the-Western-Front.jpg'} />
            <Book title={'Великий Гэтсби'} author={'Фрэнсис Скотт Фицджеральд'} year={'1925'} pages={'180'} price={'99'} cover={'/img/books/The-Great-Gatsby.jpg'} />
            <Book title={'Убить пересмешника'} author={'Харпер Ли'} year={'1960'} pages={'350'} price={'219'} cover={'/img/books/To-Kill-a-Mockingbird.jpg'} />
            <Book title={'Преступление и наказание'} author={'Федор Достоевский'} year={'1866'} pages={'680'} price={'299'} cover={'/img/books/Crime-and-Punishment.jpg'} />
            <Book title={'Цветы для Элджернона'} author={'Дэниел Киз'} year={'1966'} pages={'240'} price={'159'} cover={'/img/books/Flowers-for-Algernon.jpg'} />
            <Book title={'Над пропастью во ржи'} author={'Дж. Д. Сэлинджер'} year={'1951'} pages={'240'} price={'199'} cover={'/img/books/The-Catcher-in-the-Rye.jpg'} />
            <Book title={'Превращение (сборник)'} author={'Франц Кафка'} year={'1912'} pages={'416'} price={'179'} cover={'/img/books/Die-Verwandlung.jpg'} />
          </div>
        </div>
      </main>
    </div>
  )
};
 
export default App;
