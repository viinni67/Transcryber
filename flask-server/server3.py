import string
from flask import Flask,send_file
import pickle as pkl
from flask import request,jsonify
from flask_cors import CORS
import numpy as np
import cv2
from PIL import Image
from tqdm import tqdm
import os
import string
import matplotlib.pyplot as plt

app=Flask(__name__)
CORS(app)

with open('model-7.pkl', 'rb') as f:
   model = pkl.load(f)  

VOCABS={}
VOCABS['bengali']   = ' -।ঁংঃঅআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহ়ঽািীুূৃৄেৈোৌ্ৎৗড়ঢ়য়ৠৢৣ০১২৩৪৫৬৭৮৯ৰৱ৲৳৴৵৶৷৹৺৻'
VOCABS['gujarati']  = ' -ઁંઃઅઆઇઈઉઊઋઍએઐઑઓઔકખગઘઙચછજઝઞટઠડઢણતથદધનપફબભમયરલળવશષસહ઼ઽાિીુૂૃૄૅેૈૉોૌ્ૐ૦૧૨૩૪૫૬૭૮૯૱'
VOCABS['gurumukhi'] = ' -।ਁਂਃਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਲ਼ਵਸ਼ਸਹ਼ਾਿੀੁੂੇੈੋੌ੍ੑਖ਼ਗ਼ਜ਼ੜਫ਼੦੧੨੩੪੫੬੭੮੯ੰੱੲੳੴੵ'
VOCABS['hindi']     = ' -ँंःऄअआइईउऊऋऌऍऎएऐऑऒओऔकखगघङचछजझञटठडढणतथदधनऩपफबभमयरऱलळऴवशषसह़ऽािीुूृॄॅॆेैॉॊोौ्ॐ॒॑॓॔क़ख़ग़ज़ड़ढ़फ़य़ॠॡॢ।॥०१२३४५६७८९॰ॱॲॻॼॽॾॿ'
VOCABS['kannada']   = ' -ಂಃಅಆಇಈಉಊಋಌಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಱಲಳವಶಷಸಹ಼ಾಿೀುೂೃೄೆೇೈೊೋೌ್ೕೖೞೠೢೣ೦೧೨೩೪೫೬೭೮೯'
VOCABS['malayalam'] = ' -ംഃഅആഇഈഉഊഋഌഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരറലളഴവശഷസഹാിീുൂൃൄെേൈൊോൌ്ൗൠൡൢൣ൦൧൨൩൪൫൬൭൮൯൰൱൲൳൴൵൹ൺൻർൽൾൿ'
VOCABS['odiya']      = ' -।ଁଂଃଅଆଇଈଉଊଋଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମଯରଲଳଵଶଷସହ଼ାିୀୁୂୃୄେୈୋୌ୍ୖୗଡ଼ଢ଼ୟୠୡୢୣ୦୧୨୩୪୫୬୭୮୯୰ୱ'
VOCABS['tamil']     = ' -ஃஅஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரறலளழவஶஷஸஹாிீுூெேைொோௌ்ௐௗ௦௧௨௩௪௫௬௭௮௯௰௱௲௳௴௵௶௷௸௹௺'
VOCABS['telugu']    = ' -ఁంఃఅఆఇఈఉఊఋఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధనపఫబభమయరఱలళవశషసహాిీుూృౄెేైొోౌ్ౘౙౠౢ౦౧౨౩౪౫౬౭౮౯౸౹౺౻౼౽౾'

def save_image(cv_imgs,output_path):
    print('MAKING PDF')
    images=[]
    cv2.imwrite(os.path.join(output_path,'image.jpg'),cv_imgs[0])
    for img in tqdm(cv_imgs):
        img=Image.fromarray(img)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        images.append(img)
    print('DONE')
    images[0].save(
        os.path.join(output_path,'output_sample.pdf'), "PDF" ,resolution=100.0, save_all=True, append_images=images[1:]
    )


def gen_images(para,lang):
    cv_imgs=[]
    final_image=[]
    for idx,line in enumerate(para):
        # generated_imgs, _, word_labels = generator.generate(word_list=line)
        print('line :',line)
        generated_imgs, _, word_labels = model[lang](word_list=line)
        sentence_img = []
        for label, img in zip(word_labels, generated_imgs):
            img = img[:, img.sum(0) < 31.5]
            sentence_img.append(img)
            sentence_img.append(np.ones((img.shape[0], 15)))
        sentence_img = np.hstack(sentence_img)
        page_w=800
        # print(sentence_img.shape)
        if sentence_img.shape[1]<page_w:
            residual=page_w-sentence_img.shape[1]
        else:
            sentence_img=cv2.resize(sentence_img,(page_w-20,32))
            residual=page_w-sentence_img.shape[1]
        sentence_img = np.hstack([np.ones((img.shape[0], 15)),sentence_img,np.ones((32,residual))])
        final_image.append(sentence_img*255)
        if idx%10==0 and idx!=0:
            min_w=min([i.shape[1] for i in final_image])
            img=[]
            for i in final_image:
                y,w=i.shape
                img.append(cv2.resize(i,(min_w,y)))
            i=np.concatenate(img)
            cv_imgs.append(i)
            final_image=[]
    if len(final_image)>0:
        min_w=min([i.shape[1] for i in final_image])
        img=[]
        for i in final_image:
            y,w=i.shape
            img.append(cv2.resize(i,(min_w,y)))
        i=np.concatenate(img)
        cv_imgs.append(i)
        final_image=[]
    return cv_imgs

def prepare_text(text,lang):
    para=[]
    line=[]
    text.replace('\n',' ')
    # print('text_split :',text.split())
    result=''
    if lang=='english':
        for letter in text:
            if letter in '!"#$%&\'()*+,-–‘./:;<=>?@[]^_`{|}~' or letter.isdigit() or letter in string.punctuation:
                continue
            result+=letter
    else:
        for letter in text:
            if letter in VOCABS[lang]:
                result+=letter
    text=result
    print(text)
    if len(text.split())>0:
        for index,word in enumerate(text.split()):
            if index!=0 and index % 10 == 0:
                para.append(line)
                line=[]
            line.append(word)
        if len(line)>0:
            para.append(line)
    print(para)
    return para


@app.route("/", methods=['POST'])
def testing():
    data = request.get_json()
    text = data.get('text', '')
    print("text",text)
    return jsonify({'text': text})


@app.route("/members", methods=['POST','GET'])
def members():
    # if request.method=='GET':
    #     return send()
    
    data=request.get_json()
    text=data['text']
    lang=data['lang']
    # img=generate_img(text,lang)
    # op_data={text:img}
    
    paras=prepare_text(text,lang)
   
    print('GENERATING IMAGES ...')
    img=gen_images(paras,lang)
    print('SAVING THE FINAL IMAGE ...')
    save_image(img,r'C:\Users\User\OneDrive\Desktop\ML-full\flask-react\project\public')
    print('IMAGES GENERATED')
    
    return  jsonify(False)
    

    

if __name__=="__main__":
    app.run(debug=True)

