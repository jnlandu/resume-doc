# PDF Summarizer and Chat

A web application designed to help you quickly understand PDF documents through automated summarization and facilitate real-time discussions with other users.

## Key Features

* **PDF Upload**: Securely upload your PDF documents.
* **Automated Summarization**: Generate concise summaries of PDF content.
* **Real-time Chat**: Engage in discussions and collaborate with other users.
* **Context-Aware AI**: Ask questions about your PDF and get intelligent responses.

## Technology Stack

* **Backend**: FastAPI
* **Frontend**: React with TypeScript
* **Database**: PostgreSQL
* **AI/ML**: Langchain, OpenAI API
* **Real-time Communication**: WebSockets
* **Other Key Libraries/Tools**: Docker, Redis, Celery

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

* Python 3.9+
* Node.js v18+
* Docker and Docker Compose
* OpenAI API key

```sh
# Check Python version
python --version

# Check Node.js version
node -v
```

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/chat-with-pdf.git
    ```
2. Navigate to the project directory:
    ```sh
    cd chat-with-pdf
    ```
3. Install backend dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4. Install frontend dependencies:
    ```sh
    cd frontend
    npm install
    cd ..
    ```
5. Set up environment variables:
    ```sh
    cp .env.example .env
    # Edit .env file with your OpenAI API key and other settings
    ```

### Running the Application

#### Using Docker

```sh
docker-compose up
```

#### Manual Setup

1. Start the backend server:
    ```sh
    uvicorn app.main:app --reload
    ```
2. In a separate terminal, start the frontend:
    ```sh
    cd frontend
    npm start
    ```

The application will be available at http://localhost:3000

## Project Structure

```
chat-with-pdf/
├── app/                  # FastAPI backend
│   ├── api/              # API endpoints
│   ├── services/         # Business logic, summarization, chat handling
│   ├── models/           # Database models and schemas
│   └── core/             # Core configuration
├── frontend/             # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application pages
│   │   ├── services/     # API client and services
│   │   └── context/      # React context providers
│   └── public/
├── tests/                # Unit and integration tests
├── scripts/              # Helper scripts
├── .env.example          # Example environment variables
├── requirements.txt      # Python dependencies
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker configuration
└── README.md             # This file
```

## Deployment

### Docker Deployment

1. Build and run with Docker Compose:
    ```sh
    docker-compose up -d
    ```

### Cloud Deployment

The application can be deployed to various cloud platforms:

#### Heroku

```sh
heroku create
git push heroku main
```

#### AWS Elastic Beanstalk

1. Install EB CLI:
    ```sh
    pip install awsebcli
    ```
2. Initialize EB:
    ```sh
    eb init
    ```
3. Deploy:
    ```sh
    eb create chat-with-pdf-env
    ```

## Usage

1. **Upload a PDF**: Click the "Upload" button on the home page and select a PDF file.
2. **View Summary**: Once processing is complete, the summary will appear on the document page.
3. **Chat with the Document**: Use the chat interface to ask questions about the document content.
4. **Real-time Collaboration**: Share the document link to collaborate with others in real-time.

## Troubleshooting

* **Issue**: PDF upload fails.
  * **Solution**: Ensure PDF is under 10MB and not password-protected.

* **Issue**: Summarization takes too long.
  * **Solution**: Large documents are processed in chunks. Check server logs for specific errors.

* **Issue**: OpenAI API errors.
  * **Solution**: Verify your API key is valid and has sufficient credits.

* **Issue**: WebSocket connection failures.
  * **Solution**: Check browser console for errors and ensure no firewall is blocking WebSocket connections.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Make your changes and commit them (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## Roadmap

* [ ] Mobile application
* [ ] Multi-document comparison
* [ ] Advanced search functionality
* [ ] Document annotation tools
* [ ] User authentication and private documents
* [ ] Export summaries and chat logs
* [ ] Support for more document formats (DOCX, PPTX, etc.)
* [ ] Custom AI models for specific domains

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
