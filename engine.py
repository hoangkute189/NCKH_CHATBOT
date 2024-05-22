from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers import  AutoTokenizer, pipeline

# device = "cuda"

# model = AutoModelForCausalLM.from_pretrained(
#     'DuongTrongChi/Rikka-1.8B-v2.2',
#     torch_dtype="auto",
#     device_map="auto"
# )

# tokenizer = AutoTokenizer.from_pretrained('sail/Sailor-1.8B-Chat')
# eos_token = tokenizer("<|im_end|>",add_special_tokens=False)["input_ids"][0]
# pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)


# def chat(prompt):
#     def chat_template(prompt):
#         system_prompt = """Bạn là một trợ lý hữu ích, tôn trọng và trung thực. Luôn trả lời một cách hữu ích nhất có thể trong khi vẫn an toàn. """
#         return [
#             {"role": "system", "content": system_prompt},
#             {"role": "question", "content": prompt}
#         ]

#     prompt = pipe.tokenizer.apply_chat_template(chat_template(prompt), tokenize=False, add_generation_prompt=True)
#     outputs = pipe(prompt, max_new_tokens=512, do_sample=True, temperature=0.7, top_k=50, top_p=0.95, eos_token_id=eos_token, pad_token_id=eos_token)
#     return outputs[0]['generated_text'][len(prompt):].strip()

class ChatEngine:
   def chat(self, question):
      return "You have give your question"

# prompt = 'Dạo gần đây tôi cảm thấy rất áp lực mọi việc điều khiến tôi cảm thấy mệt mỏi. Vậy tôi cần phải làm gì để giảm bớt gánh nặng này đây?'
# prompt = "Tôi bị xã hội xa lánh, đánh đập, tôi muốn làm kẻ giết người hàng loạt, mỗi lần làm tôi cảm thấy rất thỏa mãn. Vậy tâm lý tôi có còn bình thường không?"
# res = chat(prompt)
# print(res)