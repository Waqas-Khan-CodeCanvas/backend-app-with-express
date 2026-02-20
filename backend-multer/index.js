const index = ()=>{
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>File Upload</title>
      <style>
        body {
          font-family: Arial;
          padding: 40px;
          background: #f4f4f4;
        }
        .upload-box {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 300px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        button {
          margin-top: 10px;
          padding: 8px 12px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="upload-box">
        <h2>Upload File</h2>
        <form action="/uploads" method="POST" enctype="multipart/form-data">
          <input type="file" name="file" required />
          <br/>
          <button type="submit">Upload</button>
        </form>
      </div>
    </body>
    </html>
  `
}

export default index;