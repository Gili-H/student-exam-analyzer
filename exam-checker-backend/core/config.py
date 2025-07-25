import os

class Config:
    """
    Class for basic configuration settings.
    These settings apply to all environments.
    """
    # Database Configuration
    # It's highly recommended to use environment variables for sensitive data
    # Example: DATABASE_URL should be set in your environment
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False # Disable tracking modifications for performance

    # Cloud Storage Configuration (e.g., AWS S3)
    AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
    AWS_REGION_NAME = os.environ.get('AWS_REGION_NAME', 'us-east-1')
    S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME', 'my-exam-bucket')

    # OpenAI GPT-4 API Key
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

    # JWT Authentication Secret Key
    # Generate a strong, random key for production
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'super-secret-jwt-key')
    JWT_ALGORITHM = "HS256" # Algorithm for JWT encryption

    # OCR Configuration (Tesseract)
    # Path to the Tesseract executable (if not in system PATH)
    TESSERACT_CMD = os.environ.get('TESSERACT_CMD', 'tesseract')

class DevelopmentConfig(Config):
    """
    Configuration for the development environment.
    """
    DEBUG = True
    # Override development-specific settings if needed
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL', 'postgresql://dev_user:dev_password@localhost:5432/dev_db')

class ProductionConfig(Config):
    """
    Configuration for the production environment.
    """
    DEBUG = False
    # Ensure sensitive data is ONLY from environment variables in production
    SQLALCHEMY_DATABASE_URI = os.environ.get('PROD_DATABASE_URL')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') # Must be set in production env

class TestingConfig(Config):
    """
    Configuration for the testing environment.
    """
    TESTING = True
    # Use an in-memory database or a separate test database
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL', 'sqlite:///:memory:')