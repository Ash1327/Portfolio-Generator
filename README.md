# Portfolio Generator

A dynamic portfolio generator built with React and Node.js that allows users to create professional portfolios by selecting templates and filling out detailed forms.

# Live URL
LINK : https://rococo-fairy-3bbb27.netlify.app/

Note : After filling all the details in the form and submitting it , please wait for atleast 50-60 sec as it is deployed iin the free server so it may take some time. 

## 🚀 Features

### Core Features
- **Template Selection**: Choose from 2 professionally designed templates (Modern Professional & Classic Elegant)
- **Multi-Section Form**: Comprehensive form with 8 sections:
  - Hero Section (Name, Title, Tagline, Profile Image)
  - About Me (Bio, Email, Phone, Location, Social Media)
  - Skills (Dynamic skill tags)
  - Services (3 services with title and description)
  - Portfolio (3 projects with title, image, and description)
  - Testimonials (1-3 client quotes)
  - Blog (Title and summary)
  - Contact (Message, email, phone)
- **Profile Cards**: Display submitted portfolios as professional cards
- **Dynamic Portfolio Pages**: Full portfolio pages rendered with selected templates
- **Search & Filter**: Filter portfolios by skills or role
- **Edit & Delete**: Manage existing portfolios

### Technical Features
- **React Frontend**: Modern, responsive UI with React Router
- **Node.js Backend**: Express server with RESTful API
- **File Upload**: Profile image upload functionality
- **Real-time Updates**: Dynamic filtering and search
- **Responsive Design**: Works on all device sizes

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- React Icons
- Styled Components
- Framer Motion

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- CORS
- UUID

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-generator
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Start the development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   # Backend only
   npm run server
   
   # Frontend only (in client directory)
   cd client && npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎯 Usage

### Creating a Portfolio

1. **Select Template**: Choose between Modern Professional or Classic Elegant template
2. **Fill Form**: Complete all 8 sections of the portfolio form:
   - Hero: Your name, title, and tagline
   - About: Bio, contact info, and social links
   - Skills: Add your technical skills
   - Services: Describe what you offer
   - Portfolio: Showcase your projects
   - Testimonials: Add client feedback
   - Blog: Share your thoughts
   - Contact: How people can reach you
3. **Submit**: Create your portfolio and view it in the professionals list

### Viewing Portfolios

1. **Browse**: Visit the Professionals page to see all portfolios
2. **Search**: Use the search bar to find specific portfolios
3. **Filter**: Filter by skills or role
4. **View**: Click "View Portfolio" to see the full portfolio page

### Managing Portfolios

- **Delete**: Remove portfolios from the professionals list
- **Edit**: (Feature can be extended to include edit functionality)

## 📁 Project Structure

```
portfolio-generator/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.js
│   │   │   ├── TemplateSelection.js
│   │   │   ├── PortfolioForm.js
│   │   │   ├── ProfessionalsList.js
│   │   │   └── PortfolioPage.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   └── index.js
├── public/                 # Static files
│   └── uploads/           # Uploaded images
├── package.json
└── README.md
```

## 🎨 Templates

### Modern Professional
- Clean, contemporary design
- Gradient accents
- Modern typography
- Smooth animations

### Classic Elegant
- Timeless design
- Professional typography
- Subtle animations
- Clean sections

## 🔧 API Endpoints

### Portfolios
- `GET /api/portfolios` - Get all portfolios
- `POST /api/portfolios` - Create new portfolio
- `GET /api/portfolios/:id` - Get specific portfolio
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio

### Filtering
- `GET /api/portfolios/filter/:type/:value` - Filter portfolios by skills or role

## 🚀 Deployment

### Frontend (React)
```bash
cd client
npm run build
```

### Backend (Node.js)
```bash
npm start
```

## 📸 Screenshots

<img width="1201" height="890" alt="image" src="https://github.com/user-attachments/assets/b6a22f8d-035a-4c56-b190-26dba2ea980b" />
<img width="1138" height="870" alt="image" src="https://github.com/user-attachments/assets/57f3accf-c942-400f-964d-97b741669528" />



## 🎯 Future Enhancements

- [ ] Edit portfolio functionality
- [ ] More template options
- [ ] User authentication
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Image optimization
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Export to PDF
- [ ] Custom domain support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Portfolio Generator - A dynamic portfolio creation platform

---

**Note**: This is a full-stack application with both frontend and backend components. Make sure to have Node.js installed on your system before running the application. 
