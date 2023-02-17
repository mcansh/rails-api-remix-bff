class ApplicationController < ActionController::API
  # healthcheck
  def healthcheck
    sleep 2
    render json: { status: "ok" }
  end
end
