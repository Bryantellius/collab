import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout ({children}) {
  return (
    <div className="min-h-100">
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  )
}