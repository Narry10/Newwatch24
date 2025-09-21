
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Error() {
	return (
		<>
			<Layout breadcrumbTitle="title">

				<div>
					<section className="error-section padding">
						<div className="container">
							<div className="error-content text-center">
								<img src="/assets/img/images/error-img.png" alt="error" />
								<h3 className="title">Sorry, This Page Doesn’t Exist</h3>
								<p>
									Sed ut perspiciatis unde omnis iste error sit voluptatem accusantium doloremque laudantium,
									totam rem aperiam, the eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
									vitae dicta sunt explicabo.
								</p>
								<Link href="/" className="default-btn">Back to home</Link>
							</div>
						</div>
					</section>
					{/* ./ error-section */}
					<section className="subscribe-section bg-grey-2">
						<div className="container">
							<div className="row">
								<div className="col-lg-6">
									<div className="subscribe-content">
										<h3 className="title">Get the best blog stories into your inbox!</h3>
										<div className="subscribe-form">
											<input type="email" id="email" name="email" className="form-control" placeholder="Enter Your Email" />
											<button id="submit" className="default-btn" type="submit">
												<i className="lab la-telegram-plane" />Subscribe
											</button>
											<div className="form-icon">
												<i className="las la-envelope" />
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6">
									<div className="subscribe-thumb">
										<div className="line" />
										<img src="/assets/img/images/subscribe-img.png" alt="img" />
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>

			</Layout>
		</>
	)
}
