class User < ApplicationRecord
    has_secure_password
    validates :email, presence: true, format: { with: /\A[\w+\-.]+@[a-z\-.]+\.[a-z]+\z/i, message: 'Invalid Email' }
    validates :password, presence: true, length: { minimum: 6, too_short: 'password must have at least 6 characters' } 
    validates :password_confirmation, presence: true, length: { minimum: 6, too_short: 'password must have at least 6 characters' }
    
    
    def to_token_payload
        {
            sub: id,
            email: email
        }
    end
end
