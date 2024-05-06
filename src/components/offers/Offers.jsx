import { useEffect, useState } from "react";
import OffersService from "../../service/OffersService";
import "../../style/TablesStyle.css";
import { Link } from "react-router-dom";

function Offers() {
	const [offers, setOffers] = useState([]);

	useEffect(() => {
		fetchOffers();
	}, []);

	const fetchOffers = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await OffersService.getAllOffers(token);
			setOffers(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="main-content">
			<div className="main-content-table">
				<Link className="add-resource-btn" to="/add-offer">
					Add offer
				</Link>
				<div className="table-container">
					<table className="box-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Employee</th>
								<th>Client</th>
								<th>Property</th>
								<th>Reservation</th>
								<th>Booked</th>
								<th>Available</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{offers.map((offer) => (
								<tr key={offer.id}>
									<td>{offer.id}</td>
									<td>{offer.userId}</td>
									<td>{offer.clientId}</td>
									<td>{offer.propertyId}</td>
									<td>{offer.reservationId}</td>
									<td>{offer.isBooked ? "Yes" : "No"}</td>
									<td>{offer.isAvailable ? "Yes" : "No"}</td>
									<td>
										<button className="action-btns">Details</button>
										<button className="action-btns">Update</button>
										<button className="action-btns">Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Offers;
