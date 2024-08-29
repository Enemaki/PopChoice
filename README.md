This project offers a movie recommendation system by leveraging the power of vector embeddings, PopChoice builds a deep understanding of user preferences and movie characteristics, leading to highly accurate and relevant suggestions.

Technologies Used
Vector Embeddings: We employ a pre-trained word embedding model "text-embedding-004" to translate movies and user preferences into numerical vectors. These vectors capture the semantic relationships between movies and user interests.
Google Generative AI Network: We utilize Google's pre-trained generative AI network (GoogleGenerativeAI) to analyze user interactions and refine the understanding of their preferences.
Frontend Framework: vite and javascript was used for building the user interface.
Database: Supabase to store movie data, user profiles, and recommendation history.
Project Setup
Prerequisites:

Node.js
google/generativ-ai
supabase
Installation:

Clone this repository: git clone https://github.com/your-username/PopChoice
Create a virtual environment: npm init -y 
Install dependencies: npm install
Download pre-trained word embedding model and Google's generative AI network weights (if not included).
Running the Application:

Start the development server: npm run dev
Additional Notes
This README provides a basic overview. More detailed documentation and configuration instructions will be added in specific subdirectories (e.g., backend, frontend).
The project currently utilizes pre-trained models. Explore the possibility of fine-tuning these models on movie-specific datasets for further improvement.