const districtAreaMap = {
  Dhaka: [
    "Uttara", "Mirpur", "Dhanmondi", "Mohammadpur", "Gulshan", "Banani", "Badda", "Baridhara", "Tejgaon",
    "Shyamoli", "Khilgaon", "Jatrabari", "Motijheel", "Kamalapur", "Savar", "Demra", "Kafrul", "Mohakhali",
    "Malibagh", "Rampura", "Bashundhara", "Shahbagh", "Wari", "Lalbagh", "New Market", "Paltan", "Farmgate",
    "Agargaon", "Kuril", "Khilkhet", "Tongi", "Nawabganj", "Keraniganj", "Dohar", "Narayanganj", "Narsingdi", "Gazipur"
  ],

  Chattogram: [
    "Pahartali", "Khulshi", "Agrabad", "Panchlaish", "Kotwali", "Chawkbazar", "Halishahar", "Patenga",
    "Double Mooring", "Bahaddarhat", "Nasirabad", "Lalkhan Bazar", "Muradpur", "Sholoshahar", "Bakolia",
    "Bayezid Bostami", "GEC Circle", "Katalganj", "Hathazari", "Faujdarhat", "Sitakunda", "Akbarshah"
  ],

  Rajshahi: ["Rajpara", "Shaheb Bazar", "Uposhor", "Boalia", "Motihar", "Sopura", "Katakhali", "Binodpur", "Kazla", "Hetem Khan", "Naodapara", "Meherchandi", "Bharatpur", "Horagram", "Talaimari"],

  Sylhet: ["Zindabazar", "Ambarkhana", "Subidbazar", "Shibganj", "Tilagor", "Kumarpara", "Bondor Bazar", "Dargah Gate", "Kazir Bazar", "Shahi Eidgah", "Electric Supply", "Lama Bazar", "Baghbari", "Maghbazar", "Pathantula"],
  Khulna: ["Sonadanga", "Khalishpur", "Daulatpur", "Boyra", "Batiaghata", "Shiromoni", "Gollamari", "Fulbarigate", "Khulna Sadar", "Rupsha", "Teligati", "Royaler Mor", "Bagerhat Road", "Labanchara", "Basundia"],
  Barishal: ["Nathullabad", "Rupatali", "Band Road", "C&B Road", "Chandmari", "Sagardi", "Kawnia", "Alekharchar", "Raihanpur", "Bogura Road", "Oxford Mission", "Chawkbazar", "Bazar Road", "Bangla Bazar", "Bibir Pukur Par"],
  Rangpur: ["Jahaj Company", "Pairaband", "Mithapukur", "Lalbagh", "Central Bus Terminal", "Keranipara", "Vinno Jogot", "Satmatha", "Mahiganj", "Betgari", "Uttampara", "Modern Mor", "CO Bazar", "Purbo Para", "Darshana"],
  Mymensingh: ["Ganginarpar", "Kishoreganj Road", "Trishal", "Muktagachha", "Brahmapalli", "Town Hall", "Charpara", "Agricultural University", "Durgabari", "Kachari Ferry", "Police Line", "Ramnagar", "Maskanda", "Kushtia Mor", "Jamalpur Road"],
  Narayanganj: ["Fatullah", "Shanarpar", "Chashara", "Signboard", "Tanbazar", "Pagla", "Deobhog", "Adamjee", "Shibu Market", "Bhuigarh", "Kanchpur", "Enayetnagar", "Narayanganj Sadar", "Bandar", "Kadamtoli"],
  Savar: ["Savar Bazar", "Hemayetpur", "Rajphulbaria", "Aminbazar", "Genda", "Shimulia", "Tetuljhora", "Ashulia", "Jirani", "Kaundia", "Baliarpur", "Kalma", "Pathalia", "Saver Cantonment", "Radio Colony"],
  Gazipur: ["Tongi", "Konabari", "Chandana Chowrasta", "Board Bazar", "Gazipur Sadar", "Sreepur", "Basan", "Pubail", "Kaliakoir", "Bhawal", "Hotapara", "Vogra", "Monipur", "Kapasia", "Tumulia"],
  Bagerhat: ["Fakirhat", "Mollahat", "Rampal", "Bagerhat Sadar", "Chitalmari", "Moroelganj", "Sarankhola", "Kachua", "Rayenda", "Bishnupur", "Khan Jahan Ali Mazar", "Kazi Para", "Panchgati", "Kumarkhali", "Khalishakhali"],
  Bandarban: ["Thanchi", "Ruma", "Rowangchhari", "Lama", "Bandarban Sadar", "Alikadam", "Naikhongchhari", "Tanchangya Para", "Meghla", "Nilgiri", "Chimbuk", "Balaghata", "Ujanipara", "Islampur", "Rajvila"],
  Barguna: ["Amtali", "Patharghata", "Taltali", "Barguna Sadar", "Betagi", "Bamna", "Kakchira", "Rangabali", "Nishanbaria", "Fuljhuri", "Burirchar", "Dhalua", "Boro Baishdia", "Kazirhat", "Gulishakhali"],
  Bhola: ["Lalmohan", "Borhanuddin", "Char Fasson", "Tazumuddin", "Bhola Sadar", "Daulatkhan", "Manpura", "Ilisha", "Rajapur", "Dular Hat", "Hajipur", "Alinagar", "Gazaria", "Lord Hardinge", "Joynagar"],
  Bogura: ["Sherpur", "Shibganj", "Sadar", "Gabtali", "Nandigram", "Adamdighi", "Dhunat", "Sariakandi", "Kahaloo", "Sonatola", "Dupchanchia", "Bogra Cantt.", "Satmatha", "Banani", "Charmatha"],
  Brahmanbaria: ["Ashuganj", "Bancharampur", "Nabinagar", "Sarail", "Brahmanbaria Sadar", "Kasba", "Nasirnagar", "Bijoynagar", "Akhaura", "Kuti", "Titas", "Shahbazpur", "Pattan", "Bhairabpur", "Ujanchar"],
  Comilla: ["Comilla Sadar", "Kandirpar", "Chandina", "Daudkandi", "Laksam", "Debidwar", "Barura", "Muradnagar", "Homna", "Titas", "Manoharganj", "Meghna", "Nangalkot", "Monohorgonj", "Chouddagram"],
  Jessore: ["Jessore Sadar", "Bagharpara", "Keshabpur", "Manirampur", "Abhaynagar", "Jhikargacha", "Sharsha", "Benapole", "Chaugachha", "Basundia", "Upashahar", "Dhulgram", "Baliadanga", "Rajarhat", "Trimohoni"],
  Noakhali: ["Maijdee", "Begumganj", "Senbagh", "Subarnachar", "Chatkhil", "Sonaimuri", "Kabirhat", "Companyganj", "Hatiya", "Char Jabbar", "Char Wapda", "Noakhali Sadar", "Bazra", "Jayag", "Dattarhat"],
  Pabna: ["Ishwardi", "Pabna Sadar", "Santhia", "Bera", "Atghoria", "Chatmohar", "Sujanagar", "Bhangura", "Faridpur", "Hemayetpur", "Mulgram", "Ruppur", "Dapunia", "Char Bangalia", "Dulai"],
  Rangamati: ["Baghaichari", "Barkal", "Kaptai", "Rangamati Sadar", "Juraichhari", "Langadu", "Rajasthali", "Belaichhari", "Naniarchar", "Chandraghona", "Tabalchhari", "Polwell Park", "Manikchhari", "Sapchhari", "Tabalpara"]
};

export default districtAreaMap;
