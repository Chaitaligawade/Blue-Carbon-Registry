import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName:{type:String,required:true},
  implementingOrganization:{type:String,required:true},
  projectDescription:{type:String,required:true},
  startDate:{type:String,required:true},
  endDate:{type:String,required:true},
  locUrl:{type:String,required:true},
  state:{type:String,required:true},
  city:{type:String,required:true},
  area:{type:String,required:true},
  expectedCarbon:{type:Number,required:true},
  supportingDocuments:{
    EIA_Report_Final:{type:String,required:true},
    Community_Agreement:{type:String,required:true},
    Feasibility_Study:{type:String,required:true}
  },
  visualEvidence:{
    Site_Before_Mangrove:{type:String,required:true},
    Planting_Day_Volunteer:{type:String,required:true},
    Site_After_Mangrove:{type:String,required:true}
  },
  status:{type:String,enum:['Pending','Approved','Rejected'],default:'Pending'},
  rejectionReason:{type:String,required:function(){return this.status==='Rejected';}},
  creditsIssued:{type:Number,required:function(){return this.status==='Approved';}},
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
},{timestamps:true});

const Project=mongoose.models.Project||mongoose.model("Project",projectSchema);
export default Project;