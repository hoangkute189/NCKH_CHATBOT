from flask import Flask, request, render_template
from engine import ChatEngine
app = Flask(__name__)


@app.route("/")
def index():
   return render_template("index.html")

@app.route('/question',methods = ['POST'])
def login():
   if request.method == 'POST':
      data = request.json
      question = data['question']
      answer = chatEngine.chat(question)
      return {"status": 200, "answer": answer}

if __name__ == '__main__':
   chatEngine = ChatEngine()
   app.run()