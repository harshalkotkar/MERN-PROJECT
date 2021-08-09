import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from "../images/profilepic.png"
import "../App.css"


function About() {
	const history = useHistory();
	const [userData, setUserData] = useState({});
	const callAboutPage = async () => {
		try {
			const res = await fetch("/about", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			const data = await res.json();
			console.log(data);

			setUserData(data);
			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
			history.push("/login");
		}
	};

	useEffect(() => {
		callAboutPage();		
	}, []);

	return (
		<>
			<div className="container">
				<form method="GET">
					<div className="row">
						<div className="col-md-4">
							<img className="profilepic" src={logo} alt="profilepic" />
						</div>
						<div className="col-md-6">
							<div className="profilehead">
								<h2 className="text-center text-white bg-info aboutmyname "> {userData.name} </h2>
								<h3 className="text-center bolderblack"> {userData.work}</h3>
								

								<ul className="nav nav-tabs" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" id="home-tab" data-toggle="tab" role="tab" href="#home" aria-controls="home" >Active</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="profile-tab" data-toggle="tab" role="tab" href="#profile" aria-controls="profile">Timeline</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-md-2">
							<button type="button" class="btn btn-secondary">EDIT</button>
						</div>
					</div>

					<div className="row">
						<div className="col-md-4">
							<div className="profile-work">
							<h3><p className="bolderblack">WORK LINK</p></h3>	
								<a className="bolderwhite aboutLinks" href="https://www.youtube.com/" target="harshal">Youtube</a><br />
								<a className="bolderwhite aboutLinks" href="https://www.youtube.com/" target="harshal">Instagram</a><br />
								<a className="bolderwhite aboutLinks" href="https://www.youtube.com/" target="harshal">WebsiteOfMERN</a><br />
								<a className="bolderwhite aboutLinks" href="https://www.youtube.com/" target="harshal">Web developer</a><br />
								<a className="bolderwhite aboutLinks" href="https://www.youtube.com/" target="harshal">Figma</a><br />
							</div>
						</div>

						<div className="col-md-8 pl-5 about-info">
							<div className="tab-content profile-tab" id="myTabContent">
								<div className="fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

									<div className="row">
										<div className="col-md-6">
											<label class="bolderwhite">User ID</label>
										</div>
										<div className="col-md-6">
											<p className="bolderblack">{userData._id}</p>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-md-6">
											<label class="bolderwhite">Name</label>
										</div>
										<div className="col-md-6">
											<p className="bolderblack">{userData.name}</p>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-md-6">
											<label class="bolderwhite">email</label>
										</div>
										<div className="col-md-6">
											<p className="bolderblack">{userData.email}</p>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-md-6">
											<label class="bolderwhite">phone</label>
										</div>
										<div className="col-md-6">
											<p className="bolderblack">{userData.phone}</p>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-md-6">
											<label class="bolderwhite">profesion</label>
										</div>
										<div className="col-md-6">
											<p className="bolderblack">{userData.work}</p>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>
				</form>
			</div>



		</>
	)
}

export default About
