import { useState } from 'react'
import './App.css'
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import QRCode from 'qrcode';
import { Card } from 'primereact/card';
        


function App() {
  const [query, setQuery] = useState('')
  const [qrUrl, setQrUrl] = useState('')

  const downloadQrCode = () => {
    try{
      const link = document.createElement('a')
      link.href =  qrUrl
      link.download = encodeURIComponent('qrcode')
      link.style.display = 'none';

      link.click()
     } catch(e) {
      console.error(e)
      alert('Failed to download')
     }
  }

  const generateQrCode = async () => {
      try{
        const dataUrl = await QRCode.toDataURL(query)
        setQrUrl(dataUrl);
      } catch(e) {
        console.error(e)
      }
    
    
  }

  return (
    <div className='App'>
      <h1 className='slogan'>Easy, simple and fast</h1>
      <h1 className='qrcode'>Qr Code</h1>
      <h1 className='generator'>Generator</h1>
      <InputTextarea className='text-area'autoResize value={query} onChange={(e) =>setQuery(e.target.value)} rows={2} cols={50} placeholder='Enter your URL here' />
      <br />
      
      <Button className='Button' label="Qr It" onClick={generateQrCode} />
      
      {
        qrUrl.length ? (
          <div>
            <Card title="QR code">
                <img className='image' src={qrUrl} alt='qrcode' />
                <br />
                <Button className="Button" label='Download' onClick={downloadQrCode} />
            </Card>
            </div>
            ) : ''
      }


    </div>
  );
}

export default App
