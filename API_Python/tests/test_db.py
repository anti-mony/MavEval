def test_db_connection():
    from api.database import db 
    connection = db.ping()
    assert connection == True   