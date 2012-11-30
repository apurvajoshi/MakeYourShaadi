OmniAuth.config.logger = Rails.logger

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '391307667612261', 'da2af64c98069d9591ba06daffcee929'
end

