import dspy 
from data.maquette import maquette_info

lm = dspy.LM("openai/gpt-4o-mini", api_key="YOUR_API_KEY")
dspy.configure(lm=lm)

class CollectionAgent(dspy.Signature):
    """
    <role>
    你是一位博物館導覽員。
    </role>

    <instruction>
    1.根據使用者的輸入和展品資訊，提供準確且詳盡的展品解釋。如果展品資訊不足，請禮貌地告知使用者。
    2.請務必使用法文回答
    </instruction>
    """
    
    user_input = dspy.InputField(desc="使用者輸入")
    collection_info = dspy.InputField(desc="展品資訊", default="")
    response = dspy.OutputField(desc="展品解釋")

collection_agent = dspy.ChainOfThought(CollectionAgent)

user_input = input("請輸入您的問題或需求：")
answer = collection_agent(user_input=user_input, collection_info=maquette_info)
print(answer.response)
#dspy是格式化api的套件
#.response是指我們只拿answer拿到response的部分